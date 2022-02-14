import express from "express";
import models from "../models";

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
		const aidVal = req.query.aid
		const emailVal = req.query.email
		
		const whereObject = {
		}

		if(aidVal) whereObject.Aid = aidVal
		if(emailVal) whereObject.Email = emailVal

		const masterTracks = await models.MasterTrack.findAll({
			where : whereObject,
			include: [{ all: true }]
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
		const { bi, leadSource, brand, aid, dateFtd, email, ftdAmount, currCode, salesAgent, retention } = req.body
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
			retention
		});
		if (!isValid) throw new Error("Invalid Data. Please try again !!");
		const addMasterTrack = await models.MasterTrack.create(
			{
				BI: bi, LeadSource: leadSource, Brand: brand, Aid: aid, DateFTD: dateFtd, Email: email, FTDAmount: ftdAmount, CurrencyCode: currCode, SalesAgent: salesAgent, Retention: retention
			});
		res.status(201).json(addMasterTrack);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.put("/updateDatabase", async (req,res) => {
	try{
		const {id, dbVal} = req.body
		const masterRecord = await models.MasterTrack.findOne({
			where: {
			  id: id
			}
		  });
		masterRecord.Database = dbVal
		await masterRecord.save()
		res.status(201).json(masterRecord);
	}catch(error){
		res.status(400).send(error.message);
	}
});

router.get("/getMasterTrackersOfDb", async (req, res) => {
	try {
		const lsNames = await models.LeadSource.findAll({
			where: {
				LeadSourceName: ["VA First", "VA Second"],
			}
		})

		const masterTracks = await models.MasterTrack.findAll({
			where: {
				LeadSource: lsNames.map(i=>i.id)
			  },
			  include: [{ all: true }]
		});

		res.status(201).json(masterTracks);
	} catch (error) {
		res.status(400).send(error.message);
	}
});



export default router;