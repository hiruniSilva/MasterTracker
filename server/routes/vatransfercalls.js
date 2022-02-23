import express from "express";
import dayjs from "dayjs";
import models from "../models";
import { Op } from "sequelize";

const router = express.Router();

router.get("/getTodayData", async (req, res) => {
	try {
		const vaCalls = await models.VATransferCall.findAll({
			where: {
				createdAt: {
					[Op.gte]: dayjs(dayjs().format("YYYY-MM-DD")).toDate(),
				},
			},
			include: [{ all: true }],
		});
		const branches = await models.Branch.findAll();
		const data = branches.map((branch) => {
			let vaCall = vaCalls.find((call) => call.Branch == branch.id);
			return {
				Id: branch.id,
				BranchName: branch.BranchName,
				Transfer: vaCall ? vaCall.Transfer : null,
			};
		});
       
        res.status(201).json({
			vaTransferCalls: data,
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post("/setTodayData", async (req, res) => {
	try {
		const data = req.body.data;
		const vaCalls = await models.VATransferCall.findAll({
			where: {
				createdAt: {
					[Op.gte]: dayjs(dayjs().format("YYYY-MM-DD")).toDate(),
				},
			},
			include: [{ all: true }],
		});

		const promises = data.map(async (element) => {
			let vaCall = vaCalls.find((call) => call.Branch == element.branch);
			if (vaCall) {
				vaCall.set({
					Transfer: element.transfer || null,
				});
				await vaCall.save();
			} else {
				vaCall = await models.VATransferCall.create({
					Branch: element.branch,
					Transfer: element.transfer || null,
				});
				vaCalls.push(vaCall);
			}
		});
		await Promise.all(promises);

		res.status(201).json({
			message: "Data set successfully"
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

export default router;
