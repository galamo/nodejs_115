import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../logger";
import { ERRORS } from "../enum/httpStatus";
dotenv.config();

export interface ReqLocal extends Request {
    requestId: string;
    userClaims: {
        isAdmin: boolean;
        userName: string;
    };
}

// Example of token api validation, not production
export default function authorizationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.headers["authorization"];
    if (token) {
        jwt.verify(
            token,
            process.env.SECRET as string,
            function (err: any, data: any) {
                if (err) {
                    logger.error({ message: "Token is not valid!" })
                    return next(new Error(ERRORS.UNAUTH));
                }
                else {
                    const { isAdmin, userName } = data;
                    (req as ReqLocal).userClaims = { isAdmin, userName };
                    return next();
                }
            }
        );
    } else {
        logger.error({ message: "Token not provided!" })
        return next(new Error(ERRORS.UNAUTH));
    }
}
