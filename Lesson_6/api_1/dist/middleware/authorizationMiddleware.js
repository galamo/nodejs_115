"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authorizationMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../logger"));
const httpStatus_1 = require("../enum/httpStatus");
dotenv_1.default.config();
// Example of token api validation, not production
function authorizationMiddleware(req, res, next) {
    const token = req.headers["authorization"];
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.SECRET, function (err, data) {
            if (err) {
                logger_1.default.error({ message: "Token is not valid!" });
                return next(new Error(httpStatus_1.ERRORS.UNAUTH));
            }
            else {
                const { isAdmin, userName, role, userId } = data;
                req.userData = { isAdmin, userName, role, userId };
                return next();
            }
        });
    }
    else {
        logger_1.default.error({ message: "Token not provided!" });
        return next(new Error(httpStatus_1.ERRORS.UNAUTH));
    }
}
