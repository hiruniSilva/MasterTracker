import express from "express";
import models from "../models";
import { validateToken } from "../middlewares/auth";
import _, { keys } from "lodash";

const router = express.Router();

router.get("/getBI", async (req, res) => {
	try {
		const bis = await models.BI.findAll();
		res.status(201).json(bis);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/getLeadSource", async (req, res) => {
	try {
		const leadSources = await models.LeadSource.findAll();
		res.status(201).json(leadSources);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/getBrand", async (req, res) => {
	try {
		const brands = await models.Brand.findAll();
		res.status(201).json(brands);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/getCurrencyCode", async (req, res) => {
	try {
		const currencyCodes = await models.Currency.findAll();
		res.status(201).json(currencyCodes);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/getMasterTrack", async (req, res) => {
	try {
		const aidVal = req.query.aid;
		const emailVal = req.query.email;

		const whereObject = {};

		if (aidVal) whereObject.Aid = aidVal;
		if (emailVal) whereObject.Email = emailVal;

		const masterTracks = await models.MasterTrack.findAll({
			where: whereObject,
			include: [{ all: true }],
		});

		res.status(201).json(masterTracks);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/getDatabaseNames", async (req, res) => {
	try {
		const databases = await models.Database.findAll();
		res.status(201).json(databases);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post("/addMasterTrack", async (req, res) => {
	try {
		const { bi, leadSource, brand, aid, dateFtd, email, ftdAmount, currCode, salesAgent, retention } = req.body;
		const isValid = models.MasterTrack.validateMasterData({
			bi,
			leadSource,
			brand,
			aid,
			dateFtd,
			email,
			ftdAmount,
			currCode,
			salesAgent,
			retention,
		});
		if (!isValid) throw new Error("Invalid Data. Please try again !!");
		const addMasterTrack = await models.MasterTrack.create({
			BI: bi,
			LeadSource: leadSource,
			Brand: brand,
			Aid: aid,
			DateFTD: dateFtd,
			Email: email,
			FTDAmount: ftdAmount,
			CurrencyCode: currCode,
			SalesAgent: salesAgent,
			Retention: retention,
		});
		res.status(201).json(addMasterTrack);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.put("/updateDatabase", async (req, res) => {
	try {
		const { id, dbVal } = req.body;
		const masterRecord = await models.MasterTrack.findOne({
			where: {
				id: id,
			},
		});
		masterRecord.Database = dbVal;
		await masterRecord.save();
		res.status(201).json(masterRecord);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/getMasterTrackersOfDb", async (req, res) => {
	try {
		const lsNames = await models.LeadSource.findAll({
			where: {
				LeadSourceName: ["VA First", "VA Second"],
			},
		});

		const masterTracks = await models.MasterTrack.findAll({
			where: {
				LeadSource: lsNames.map((i) => i.id),
			},
			include: [{ all: true }],
		});

		res.status(201).json(masterTracks);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/getUserView", validateToken, async (req, res) => {
	try {
		const teams = await models.UserTeam.findAll({
			where: {
				user: req.user.id,
			},
		});

		const masterTracks = await models.MasterTrack.findAll({
			where: {
				BI: teams.map((i) => i.bi),
			},
			include: [{ all: true }],
		});

		res.status(201).json(masterTracks);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/report1", async (req, res) => {
	try {
		const masterTracks = await models.MasterTrack.findAll({
			include: [{ all: true }],
		});
		const getFTDAmounts = (data)=> {
			const grouped = _.groupBy(data, i=>i.CurrencyCode)
			return Object.keys(grouped).map(i=>({
				CurrencyCode: grouped[i][0].CurrencyValue.CurrencyCode,
				Amount: grouped[i].reduce((partialSum, a) => partialSum + (+a.FTDAmount), 0)
			}))
		}
		const getSources = (data) => {
			const grouped = _.groupBy(data, i=>i.LeadSource)
			return Object.keys(grouped).map(i=>({
				LeadSourceName: grouped[i][0].LeadSourceValue.LeadSourceName,
				Count: grouped[i].length
			}))
		}
		const groupedTracks = _.groupBy(masterTracks, (item)=>item.BI)
		const groupedTracksValues = Object.keys(groupedTracks).map(key=>({
			BIName: groupedTracks[key][0].BIvalue.BIName,
			NoFTD: groupedTracks[key].length,
			FTDAmount: getFTDAmounts(groupedTracks[key]),
			Sources: getSources(groupedTracks[key])
		}))
		res.status(200).json(groupedTracksValues);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

export default router;
