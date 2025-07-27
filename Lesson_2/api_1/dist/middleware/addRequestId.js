"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addRequestId;
const uuid_1 = require("uuid");
// Example of token api validation, not production
function addRequestId(req, res, next) {
    const guid = (0, uuid_1.v4)();
    res.setHeader("X-Request-ID", guid);
    req.requestId = guid;
    return next();
}
