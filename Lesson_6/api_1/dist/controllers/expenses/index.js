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
exports.sumTotal = sumTotal;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../../db"));
dotenv_1.default.config();
const router = express_1.default.Router();
const expensesLastWeek = [
    {
        id: 1,
        date: "2025-08-06",
        category: "Groceries",
        amount: 45.75,
        description: "Weekly supermarket shopping",
    },
    {
        id: 2,
        date: "2025-08-07",
        category: "Transport",
        amount: 12.5,
        description: "Bus pass recharge",
    },
    {
        id: 3,
        date: "2025-08-08",
        category: "Dining",
        amount: 27.0,
        description: "Lunch with friends",
    },
    {
        id: 4,
        date: "2025-08-09",
        category: "Entertainment",
        amount: 15.99,
        description: "Movie rental",
    },
    {
        id: 5,
        date: "2025-08-10",
        category: "Health",
        amount: 60.0,
        description: "Pharmacy purchase",
    },
    {
        id: 6,
        date: "2025-08-11",
        category: "Utilities",
        amount: 120.0,
        description: "Electricity bill",
    },
    {
        id: 7,
        date: "2025-08-12",
        category: "Coffee",
        amount: 5.25,
        description: "Morning coffee",
    },
];
const createExpensesTable = () => {
    return `CREATE TABLE northwind.expenses (
  id INT NOT NULL AUTO_INCREMENT,
  amount DECIMAL(10,2) NOT NULL,
  date DATETIME NOT NULL,
  category VARCHAR(45) NOT NULL,
  description VARCHAR(45) NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC)
);`;
};
const insertExpenses = `
        INSERT INTO northwind.expenses (id, date, category, amount, description)
        VALUES (?, ?, ?, ?, ?)
    `;
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, db_1.default)();
        const getExpensesBetweenDates = `SELECT *
            FROM northwind.expenses
            ORDER BY date ASC`;
        const [rows] = yield conn.execute(getExpensesBetweenDates, []);
        return res.json({ data: rows });
    }
    catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
}));
router.get("/reset", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, db_1.default)();
        yield conn.execute("DROP TABLE IF EXISTS northwind.expenses");
        yield conn.execute(createExpensesTable(), []);
        // const result = await (await getConnection()).execute(createExpensesTable(), []);
        for (const exp of expensesLastWeek) {
            yield conn.execute(insertExpenses, [
                exp.id,
                exp.date,
                exp.category,
                exp.amount,
                exp.description,
            ]);
        }
        res.json({ message: "expenses table reset completed!" });
    }
    catch (error) {
        res.json({ message: `there was an error ${error}` });
    }
    res.json({ expensesLastWeek });
}));
router.get("/expenses", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
router.post("/expenses", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, category, date, description } = req.body;
        if (!amount || !category || !date) {
            return res
                .status(400)
                .json({ message: "Missing required fields: amount, category or date" });
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
    const result = sumTotal(expensesLastWeek);
    return res.json({ total: result });
});
// classic use case for unit test
function sumTotal(expensesArray) {
    if (!expensesArray)
        return;
    const total = expensesArray.reduce((acc, current) => {
        return acc + current.amount;
    }, 0);
    return total;
}
exports.default = router;
