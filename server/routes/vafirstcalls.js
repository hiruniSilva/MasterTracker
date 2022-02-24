import express from "express";
import dayjs from "dayjs";
import models from "../models";
import { Op } from "sequelize";
import _ from "lodash";

const router = express.Router();

router.get("/getTodayData", async (req, res) => {
	try {
		const vaCalls = await models.VAFirstCall.findAll({
			where: {
				createdAt: {
					[Op.gte]: dayjs(dayjs().format("YYYY-MM-DD")).toDate(),
				},
			},
			include: [{ all: true }],
		});
		const bis = await models.BI.findAll();
		const data = bis.map((bi) => {
			let vaCall = vaCalls.find((call) => call.BI == bi.id);
			return {
				BI: bi.id,
				BIName: bi.BIName,
				canvases: vaCall ? vaCall.canvases : null,
			};
		});
        const forVATransferCall = await models.ForVATransferCall.findOne({
			where: {
				createdAt: {
					[Op.gte]: dayjs(dayjs().format("YYYY-MM-DD")).toDate(),
				},
			},
		});
		const headCountObj = await models.Config.findOne({
			where: {
				key: "HEAD_COUNT"
			},
		});

        res.status(201).json({
			headCount: headCountObj ? headCountObj.value : 0,
			forVATransferCallValue: forVATransferCall ? forVATransferCall.value : null,
			vaFirstCalls: data,
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/report", async (req, res) => {
	try {
		const startDate = dayjs(dayjs(req.query.startDate).format("YYYY-MM-DD")).toDate()
		const endDate = dayjs(dayjs(req.query.endDate).format("YYYY-MM-DD")).add(1,'day').toDate()
		const vaCalls = await models.VAFirstCall.findAll({
			where: {
				createdAt: {
					[Op.between]: [startDate, endDate],
				},
			},
			include: [{ all: true }],
		});

		const grouped = _.groupBy(vaCalls, (call) => call.BI);
		const bis = await models.BI.findAll();
		const data = bis.map((bi) => {
			return {
				BI: bi.id,
				BIName: bi.BIName,
				canvases: grouped[bi.id] ? grouped[bi.id].reduce((acc, call) => acc + call.canvases, 0) : 0,
			};
		});

        res.status(200).json({
			vaFirstCalls: data,
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post("/setTodayData", async (req, res) => {
	try {
		const data = req.body.data;
		const vaCalls = await models.VAFirstCall.findAll({
			where: {
				createdAt: {
					[Op.gte]: dayjs(dayjs().format("YYYY-MM-DD")).toDate(),
				},
			},
			include: [{ all: true }],
		});

		const promises = data.map(async (element) => {
			let vaCall = vaCalls.find((call) => call.BI == element.bi);
			if (vaCall) {
				vaCall.set({
					canvases: element.canvases || null,
				});
				await vaCall.save();
			} else {
				vaCall = await models.VAFirstCall.create({
					BI: element.bi,
					canvases: element.canvases || null,
				});
				vaCalls.push(vaCall);
			}
		});
		await Promise.all(promises);

        let forVATransferCall = await models.ForVATransferCall.findOne({
			where: {
				createdAt: {
					[Op.gte]: dayjs(dayjs().format("YYYY-MM-DD")).toDate(),
				},
			},
		});
        const forVATransferCallValue = req.body.value
        if (forVATransferCall) {
			forVATransferCall.set({
				value: forVATransferCallValue || null,
			});
			await forVATransferCall.save();
		} else {
			forVATransferCall = await models.ForVATransferCall.create({
				value: forVATransferCallValue || null,
			});
		}
		res.status(201).json({
			message: "Data set successfully"
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

export default router;
