import express from "express";
import models from "../models";

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		// const user = await models.User.create({ name, email, password });

		res.status(201).json({
			message: "User created successfully",
			data:  { name, email, password }
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

export default router;
