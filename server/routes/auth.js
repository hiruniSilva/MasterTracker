import express from "express";
import models from "../models";

const router = express.Router();

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await models.User.findOne({ where: { email } });
		if (!user) throw new Error("Incorrect Email or Password");
		const validPassword = await user.comparePassword(password);
		if (!validPassword) throw new Error("Incorrect Email or Password");

		res.status(200).json({
			tokens: user.generateTokens(),
			user: user.toUserJson(),
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

export default router;