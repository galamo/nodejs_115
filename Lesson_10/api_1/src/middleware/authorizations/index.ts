import express, { Request, Response, NextFunction } from "express";
import { ReqLocal } from "../authorizationMiddleware";
export type roles = "admin" | "configurator" | "owner" | "viewer"
export const validateAutMiddleware = (roles: Array<roles>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if ((req as ReqLocal).userData?.isAdmin) return next()
        const role = (req as ReqLocal)?.userData?.role
        if (Array.isArray(roles) && roles.includes(role)) return next()
        else return res.status(403).send("error")
    }
}