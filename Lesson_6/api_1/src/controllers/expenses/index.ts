import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
dotenv.config()
const router = express.Router()

router.get("/", (req, res, next) => {
    res.json({ message: "i am protected!!!" })
})


export default router;