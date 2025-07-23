"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_token_1 = __importDefault(require("./middleware/api.token"));
const requestDuration_1 = __importDefault(require("./middleware/requestDuration"));
const rateLimiter_1 = __importDefault(require("./middleware/rateLimiter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(requestDuration_1.default);
app.use(api_token_1.default);
app.use(rateLimiter_1.default);
app.get("/protected", (req, res, next) => {
    res.send("Talliya using notebook");
});
app.use((error, req, res, next) => {
    switch (error.message) {
        case "UNAUTH": {
            return res.status(401).send("Unauthorized___");
        }
        default: {
            return res.status(500).send("Something went wrong Yam is working to fix it & flight to America");
        }
    }
});
app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
    }
    else {
        console.log(`Api is running on port ${PORT}`);
    }
});
