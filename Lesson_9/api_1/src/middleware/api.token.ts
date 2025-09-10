import { Request, Response, NextFunction } from "express"
// Example of token api validation, not production
export default function apiToken(req: Request, res: Response, next: NextFunction) {

    if ((req?.query?.token as string)?.toLowerCase() === (process.env.TOKEN as string).toLowerCase()) {
        return next()
    } else {
        return next()
        // return next(new Error())
    }
}