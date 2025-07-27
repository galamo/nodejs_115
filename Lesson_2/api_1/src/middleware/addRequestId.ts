import { Request, Response, NextFunction } from "express"
import { v4 as uuidv4 } from 'uuid';
import { ReqLocal } from "./authorizationMiddleware";


// Example of token api validation, not production
export default function addRequestId(req: Request, res: Response, next: NextFunction) {
    const guid = uuidv4();
    res.setHeader("X-Request-ID", guid);
    (req as ReqLocal).requestId = guid;
    return next()
}