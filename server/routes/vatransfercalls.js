import express from "express";
import dayjs from "dayjs";
import models from "../models";
import { Op } from "sequelize";
import _ from "lodash";

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

		const forVATransferCall = await models.ForVATransferCall.findOne({
			where: {
				createdAt: {
					[Op.gte]: dayjs(dayjs().format("YYYY-MM-DD")).toDate(),
				},
			},
		});
       
        res.status(201).json({
			vaTransferCalls: data,
			forVATransferCallValue: forVATransferCall ? forVATransferCall.value : null,
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/report", async (req, res) => {
	try {
		const startDate = dayjs(dayjs(req.query.startDate).format("YYYY-MM-DD")).toDate()
		const endDate = dayjs(dayjs(req.query.endDate).format("YYYY-MM-DD")).add(1,'day').toDate()
		const vaTransferCalls = await models.VATransferCall.findAll({
			where: {
				createdAt: {
					[Op.between]: [startDate, endDate],
				},
			},
			include: [{ all: true }],
		});

		const grouped = _.groupBy(vaTransferCalls, (call) => call.Branch);
		const branches = await models.Branch.findAll();
		const data = branches.map((branch) => {
			return {
				Branch: branch.id,
				BranchName: branch.BranchName,
				Transfers: grouped[branch.id] ? grouped[branch.id].reduce((acc, call) => acc + call.transfers, 0) : 0,
			};
		});

		let forVATransferCalls = await models.ForVATransferCall.findAll({
			where: {
				createdAt: {
					[Op.between]: [startDate, endDate],
				},
			},
		});

        res.status(200).json({
			vaTransferCalls: data,
			forVATransferCalls: forVATransferCalls.map((call)=>call.value)
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
