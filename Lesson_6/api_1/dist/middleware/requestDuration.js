"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = requestDuration;
function requestDuration(req, res, next) {
    const start = Date.now();
    console.log(`[Start ${new Date().toISOString()}]=>${req.originalUrl}`);
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`[Finish ${new Date().toISOString()}]=>${req.originalUrl} :: duration: ${duration}ms`);
    });
    next();
}
