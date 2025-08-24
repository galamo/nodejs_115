import { Request, Response, NextFunction } from "express"
import logger from "../logger";


export default function requestDuration(req: Request, res: Response, next: NextFunction) {
    const start = Date.now()
    const requestId = `${(req as any).requestId || "NoReqID"}`
    logger.info({ message: `[Start ${new Date().toISOString()}]=>${req.originalUrl} ${requestId}` })
    res.on("finish", () => {
        const duration = Date.now() - start;
        logger.info({ message: `[Finish ${new Date().toISOString()}]=>${req.originalUrl} :: duration: ${duration}ms  ${requestId}` })
    })
    next()
}