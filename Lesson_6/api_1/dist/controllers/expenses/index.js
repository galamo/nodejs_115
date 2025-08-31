"use strict";
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../../db"));
const getCategories_1 = __importDefault(require("./getCategories"));
const authorizations_1 = require("../../middleware/authorizations");
dotenv_1.default.config();
const router = express_1.default.Router();
const insertExpenses = `
        INSERT INTO northwind.expenses (id, date, category, amount, description)
        VALUES (?, ?, ?, ?, ?)
    `;
router.use((0, authorizations_1.validateAutMiddleware)(["admin", "configurator", "owner", "viewer"]));
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, db_1.default)();
        const getExpensesBetweenDates = `SELECT *
            FROM northwind.expenses
            ORDER BY date DESC`;
        const [rows] = yield conn.execute(getExpensesBetweenDates, []);
        return res.json({ data: rows });
    }
    catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
}));
router.get("/categories", (0, authorizations_1.validateAutMiddleware)(["configurator"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, getCategories_1.default)();
        return res.json({ data: result });
    }
    catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
}));
router.get("/dates", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const from = req.query.from;
        const to = req.query.to;
        if (!from || !to) {
            return res
                .status(400)
                .json({ message: "Missing 'from' or 'to' query parameters" });
        }
        const conn = yield (0, db_1.default)();
        const getExpensesBetweenDates = `SELECT *
            FROM northwind.expenses
            WHERE date BETWEEN ? AND ?
            ORDER BY date ASC`;
        const [rows] = yield conn.execute(getExpensesBetweenDates, [from, to]);
        return res.json({ data: rows });
    }
    catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
}));
router.post("/expenses", (0, authorizations_1.validateAutMiddleware)(["admin", "configurator", "owner"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.method, req.url);
    try {
        const { amount, category, date, description } = req.body;
        if (!amount || !category || !date) {
            return res
                .status(400)
                .json({
                message: "Missing required fields: amount, category or date",
            });
        }
        const conn = yield (0, db_1.default)();
        const params = [amount, date, category, description || null];
        const [result] = yield conn.execute(`INSERT INTO northwind.expenses (amount, date, category, description)
             VALUES (?, ?, ?, ?)`, params);
        const insertedId = result.insertId;
        return res.status(201).json({
            message: "Expense created successfully",
            id: insertedId,
        });
    }
    catch (error) {
        console.error("Failed to insert expense:", error);
        return res.status(500).json({ message: "expenses insert error" });
    }
}));
router.get("/sum-all-expenses", (req, res, next) => {
    //   return res.json({ total: result });
});
exports.default = router;
