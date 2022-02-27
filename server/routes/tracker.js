import express from "express";
import models from "../models";
import { validateToken } from "../middlewares/auth";
import _, { keys } from "lodash";
import { Op } from "sequelize";

const router = express.Router();

router.get("/getBI", async (req, res) => {
	try {
		const bis = await models.BI.findAll();
		res.status(201).json(bis);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/getUserBI", validateToken, async (req, res) => {
	try {
		const teams = await models.UserTeam.findAll({
			where: {
				user: req.user.id
			},
			include: [{ all: true }],
		});
		res.status(201).json(teams.map(u=>u.BI));
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
			order: [
				['DateFTD', 'DESC']
			]
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

router.get("/getRetentionNames", async (req, res) => {
	try {
		const retention = await models.Retention.findAll();
		res.status(201).json(retention);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/getBranches", async(req,res)=>{
	try{
		const branches = await models.Branch.findAll({ include: { all: true } });
		res.status(201).json(branches);
	}catch(error){
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

router.post("/createBranch", async (req, res) => {
	try {
		const {branchName, teams} = req.body;
		const isValid = models.Branch.validateBranchData({
			branchName,
			teams
		});
		if (!isValid) throw new Error("Invalid Data. Please try again !!");

		const branch = await models.Branch.create({
			BranchName: branchName
		});
		const teamObjs = await models.Team.findAll({
			where: {
				id: teams || {},
			},
		});
		await branch.setTeams(teamObjs);
		res.status(200).json(branch);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post("/updateBranch", async (req, res) => {
	try {
		const {id, branchName, teams} = req.body;
        const branch = await models.Branch.findOne({
            where: {id}
        })
        if (!branch) throw new Error("Invalid Branch");
		const isValid = models.Branch.validateBranchData({
			branchName,
			teams
		});
        if (!isValid) throw new Error("Invalid Data");
        branch.set({
			branchName,
		});
		const teamObjs = await models.Team.findAll({
			where: {
				id: teams || {},
			},
		});
		await branch.setTeams(teamObjs);
        await branch.save()
		res.status(200).json(branch);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.delete("/deleteBranch", async (req, res) => {
	try {
		const { id } = req.query;
        const branch = await models.Branch.findOne({
            where: {id}
        })
        if (!branch) throw new Error("Invalid Branch Name");
		const vaTransferCalls = await models.VATransferCall.findAll({
			where: {
				Branch: id
			},
		});
		await Promise.all(vaTransferCalls.map(call=>call.destroy()));
        await branch.destroy();
		res.status(200).json(branch);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/getTeams", async(req,res)=>{
	try{
		const teams = await models.Team.findAll({ include: { all: true } });
		res.status(201).json(teams);
	}catch(error){
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
				LeadSourceName: ["VA - First Call", "VA - Transfer Call"],
			},
		});

		const masterTracks = await models.MasterTrack.findAll({
			where: {
				LeadSource: lsNames.map((i) => i.id),
			},
			order: [
				['DateFTD', 'DESC']
			],
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
				user: req.user.id
			},
		});

		const masterTracks = await models.MasterTrack.findAll({
			where: {
				BI: teams.map((i) => i.bi),
			},
			order: [
				['DateFTD', 'DESC']
			],
			include: [{ all: true }],
		});

		res.status(201).json(masterTracks);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/report1", async (req, res) => {
	try {
		const startDate = new Date(req.query.startDate)
		const endDate = new Date(req.query.endDate)
		const masterTracks = await models.MasterTrack.findAll({
			include: [{ all: true }],
			where: {
				DateFTD: {
					[Op.between]: [startDate, endDate],
				},
			},
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

router.get("/report2", async (req, res) => {
	try {
		const masterTracks = await models.MasterTrack.findAll({
			include: [{ all: true }],
			where: {
				DateFTD: {
					[Op.between]: [new Date(req.query.startDate), new Date(req.query.endDate)],
				},
			},
		});
		const getFTDAmounts = (data)=> {
			const grouped = _.groupBy(data, i=>i.CurrencyCode)
			return Object.keys(grouped).map(i=>({
				CurrencyCode: grouped[i][0].CurrencyValue.CurrencyCode,
				Amount: grouped[i].reduce((partialSum, a) => partialSum + (+a.FTDAmount), 0)
			}))
		}
		const groupedTracks = _.groupBy(masterTracks, (item)=>item.Database)
		const groupedTracksValues = Object.keys(groupedTracks).filter(i=>groupedTracks[i][0].DatabaseValue).map(key=>({
			DatabaseName: groupedTracks[key][0].DatabaseValue.dbName,
			NoFTD: groupedTracks[key].length,
			FTDAmount: getFTDAmounts(groupedTracks[key]),
		}))
		res.status(200).json(groupedTracksValues);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/getRetentionList", async(req,res)=>{
	try {
		const brands = await models.Brand.findAll();
		res.status(201).json(brands);
	} catch (error) {
		res.status(400).send(error.message);
	}
})

export default router;
