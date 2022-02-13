import express from "express";

const router = express.Router()

router.get('/', (req, res)=> res.send("welcome"))
router.use('/auth', require("./auth").default)
router.use('/tracker', require("./tracker").default)

export default router