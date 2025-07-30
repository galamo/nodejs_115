import express, { Request, Response, NextFunction } from "express"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
const router = express.Router()

const url = "https://data.gov.il/api/3/action/datastore_search?resource_id=8efa5992-db41-40ba-ab86-05dad100e593&q=jones"

router.get("/", async (req, res, next) => {
    try {
        const result = await axios.get(url)
        return res.json({ message: result.data })
    } catch (error: any) {
        return next(new Error(error.message))
    }
})


export default router;