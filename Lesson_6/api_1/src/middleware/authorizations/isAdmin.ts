import express, { Request, Response, NextFunction } from "express";
import { ReqLocal } from "../../middleware/authorizationMiddleware";


export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const role = (req as ReqLocal)?.userData?.role
    if (role !== "admin") return res.status(403).send("error")
    else return next()
}