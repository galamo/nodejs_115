"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumTotal = sumTotal;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const expensesLastWeek = [
    {
        id: 1,
        date: '2025-08-06',
        category: 'Groceries',
        amount: 45.75,
        description: 'Weekly supermarket shopping'
    },
    {
        id: 2,
        date: '2025-08-07',
        category: 'Transport',
        amount: 12.50,
        description: 'Bus pass recharge'
    },
    {
        id: 3,
        date: '2025-08-08',
        category: 'Dining',
        amount: 27.00,
        description: 'Lunch with friends'
    },
    {
        id: 4,
        date: '2025-08-09',
        category: 'Entertainment',
        amount: 15.99,
        description: 'Movie rental'
    },
    {
        id: 5,
        date: '2025-08-10',
        category: 'Health',
        amount: 60.00,
        description: 'Pharmacy purchase'
    },
    {
        id: 6,
        date: '2025-08-11',
        category: 'Utilities',
        amount: 120.00,
        description: 'Electricity bill'
    },
    {
        id: 7,
        date: '2025-08-12',
        category: 'Coffee',
        amount: 5.25,
        description: 'Morning coffee'
    }
];
router.get("/", (req, res, next) => {
    res.json({ expensesLastWeek });
});
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
