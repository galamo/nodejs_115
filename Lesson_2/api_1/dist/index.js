"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((req, res, next) => {
    console.log(`[Start ${new Date().toISOString()}]=>${req.originalUrl}`);
    next();
    res.on("finish", () => {
        console.log(`[Finish ${new Date().toISOString()}]=>${req.originalUrl}`);
    });
});
app.get("/protected", (req, res, next) => {
    res.send("Talliya using notebook");
});
app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
    }
    else {
        console.log(`Api is running on port ${PORT}`);
    }
});
