import express, { Request, Response, NextFunction } from "express";
import * as z from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ReqLocal } from "../../middleware/authorizationMiddleware";

dotenv.config();
const router = express.Router();



router.post("/details", async (req, res, next) => {
    try {
       const userId = (req as ReqLocal).userData?.userId
       
    } catch (error) {

    }
});

export default router;
