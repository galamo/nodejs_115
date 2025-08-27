import express, { Request, Response, NextFunction } from "express";
import * as z from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ReqLocal } from "../../middleware/authorizationMiddleware";
import { getUserDetails } from "./getUserDetails";
import logger from "../../logger";

dotenv.config();
const router = express.Router();



router.get("/details", async (req, res, next) => {
    try {
        const userId = (req as ReqLocal).userData?.userId
        const result = await getUserDetails(userId)
        return res.json(result)
    } catch (error: any) {
        logger.error(error.message)
        return next(new Error("error when getting user details"))
    }
});

export default router;
