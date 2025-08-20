"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = __importDefault(require("express"));
const loginHandler_1 = require("./loginHandler");
const httpStatus_1 = require("../../enum/httpStatus");
const z = __importStar(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const registrationHandler_1 = require("./registrationHandler");
dotenv_1.default.config();
const router = express_1.default.Router();
const User = z.object({
    userName: z.email().max(30),
    password: z.string().min(4).max(20),
});
const UserRegister = z.object({
    userName: z.email().max(30),
    password: z.string().min(4).max(20),
    age: z.number(),
    phone: z.string(),
});
const fp = z
    .object({
    userName: z.email().max(30),
})
    .strict();
exports.users = [
    { userName: "admin@gmail.com", password: "admin" },
];
const mappingSchemaValidation = {
    login: User,
    register: UserRegister,
    "forgat-password": fp,
};
function authInputValidation(req, res, next) {
    const url = req.url.replace("/", "");
    const currentSchema = mappingSchemaValidation[url];
    const validation = currentSchema.safeParse(req.body);
    if (!validation.success) {
        console.log(validation.error);
        throw new Error(httpStatus_1.ERRORS.BAD_REQUEST);
    }
    else {
        next();
    }
}
router.post("/login", authInputValidation, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const foundUser = yield (0, loginHandler_1.login)({ userName, password });
        if (foundUser) {
            const token = jsonwebtoken_1.default.sign({ userName: foundUser.userName, isAdmin: true }, process.env.SECRET || "secret", { expiresIn: "1m" });
            return res
                .setHeader("Authorization", token)
                .json({ message: "User logged in successfully", token });
        }
        else
            throw new Error(httpStatus_1.ERRORS.UNAUTH);
    }
    catch (error) {
        console.log(error);
        return next(new Error(error.message));
    }
}));
router.post("/register", authInputValidation, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password, phone, age } = req.body;
        const result = yield (0, registrationHandler_1.register)({ userName, password, phone, age });
        if (result) {
            return res.json({ message: "User Registered in successfully" });
        }
        else
            throw new Error("user already exist");
    }
    catch (error) {
        console.log(error.message);
        return next(new Error(error.message));
    }
}));
router.post("/forgat-password", authInputValidation, (req, res, next) => {
    try {
        const { userName } = req.body;
        if (userName)
            return res.json({ message: "password reset!" });
        else
            throw new Error(httpStatus_1.ERRORS.UNAUTH);
    }
    catch (error) {
        console.log(error);
        return next(new Error(error.message));
    }
});
// THIS IS NOT PRODUCTION FUNCTION ONLY FOR TESTING
router.delete("/clean", (req, res, next) => {
    exports.users = [];
    console.log("DELETED ", exports.users);
    res.send("deleted");
});
exports.default = router;
