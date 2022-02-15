import express from "express";
import { validateToken } from "../middlewares/auth";
import models from "../models";

const router = express.Router();

router.get("/all", async (req, res) => {
	try {
        const users = await models.User.findAll({ include: { all: true } });
		res.status(200).json(users.map(user=>user.toUserJson()));
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/current", validateToken, async (req, res) => {
	const user = await models.User.findOne({
		where: {
			id: req.user.id
		}
	});
	res.send(user ? user.toUserJson() : null)
});

router.post("/create", async (req, res) => {
	try {
		const { fullname, email, password, roles, teams } = req.body;

        const isValid = models.User.validateUserData({
			fullname,
			email,
			password,
			roles,
		});
        if (!isValid) throw new Error("Invalid Data");
        const user = await models.User.create({
			fullname,
			email,
			roles,
			passwordHash: await models.User.hashPassword(password),
		});
		const bis = await models.BI.findAll({
			where: {
				id: teams || [],
			},
		});
		await user.setBIs(bis);
		res.status(200).json(user.toUserJson());
	} catch (error) {
		res.status(400).send(error.message);
	}
});


router.post("/update", async (req, res) => {
	try {
		const { id, fullname, email, roles, teams } = req.body;
        const user = await models.User.findOne({
            where: {id}
        })
        if (!user) throw new Error("Invalid User");
        const isValid = models.User.validateUserData({
			fullname,
			email,
			roles,
		});
        if (!isValid) throw new Error("Invalid Data");
        user.set({
			fullname,
			email,
			roles,
		});
		const bis = await models.BI.findAll({
			where: {
				id: teams || [],
			},
		});
		await user.setBIs(bis);
        await user.save()
		res.status(200).json(user.toUserJson());
	} catch (error) {
		res.status(400).send(error.message);
	}
});


router.post("/password-reset", async (req, res) => {
	try {
		const { id, password } = req.body;
        const user = await models.User.findOne({
            where: {id}
        })
        if (!user) throw new Error("Invalid User");
        const isValid = models.User.validatePassword(password)
        if (!isValid) throw new Error("Invalid Data");
        user.set({
			passwordHash: await models.User.hashPassword(password),
		});
        await user.save()
		res.status(200).json(user.toUserJson());
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.delete("/delete", async (req, res) => {
	try {
		const { id } = req.query;
        const user = await models.User.findOne({
            where: {id}
        })
        if (!user) throw new Error("Invalid User");
        await user.destroy();
		res.status(200).json(user.toUserJson());
	} catch (error) {
		res.status(400).send(error.message);
	}
});

export default router;
