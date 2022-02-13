import express from "express";
import models from "../models";

const router = express.Router();

router.get("/all", async (req, res) => {
	try {
        const users = await models.User.findAll();
		res.status(200).json(users.map(user=>user.toUserJson()));
	} catch (error) {
		res.status(400).send(error.message);
	}
});


router.post("/create", async (req, res) => {
	try {
		const { fullname, email, password, roles } = req.body;

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
		res.status(200).json(user.toUserJson());
	} catch (error) {
		res.status(400).send(error.message);
	}
});


router.post("/update", async (req, res) => {
	try {
		const { id, fullname, email, roles } = req.body;
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
        await user.save()
		res.status(200).json(user.toUserJson());
	} catch (error) {
		res.status(400).send(error.message);
	}
});

export default router;
