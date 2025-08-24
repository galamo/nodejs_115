"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = requestDuration;
const logger_1 = __importDefault(require("../logger"));
function requestDuration(req, res, next) {
    const start = Date.now();
    const requestId = `${req.requestId || "NoReqID"}`;
    logger_1.default.info({ message: `[Start ${new Date().toISOString()}]=>${req.originalUrl} ${requestId}` });
    res.on("finish", () => {
        const duration = Date.now() - start;
        logger_1.default.info({ message: `[Finish ${new Date().toISOString()}]=>${req.originalUrl} :: duration: ${duration}ms  ${requestId}` });
    });
    next();
}
