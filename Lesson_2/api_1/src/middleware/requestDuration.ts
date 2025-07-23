import { Request, Response, NextFunction } from "express"


export default function requestDuration(req: Request, res: Response, next: NextFunction) {
    const start = Date.now()
    console.log(`[Start ${new Date().toISOString()}]=>${req.originalUrl}`)
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`[Finish ${new Date().toISOString()}]=>${req.originalUrl} :: duration: ${duration}ms`)
    })
    next()
}