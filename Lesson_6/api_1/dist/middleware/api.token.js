"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = apiToken;
// Example of token api validation, not production
function apiToken(req, res, next) {
    var _a, _b;
    if (((_b = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.token) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === process.env.TOKEN.toLowerCase()) {
        return next();
    }
    else {
        return next();
        // return next(new Error())
    }
}
