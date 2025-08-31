import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import getConnection from "../../db";
import getCategories from "./getCategories";
import { ReqLocal } from "../../middleware/authorizationMiddleware";
import { validateAutMiddleware } from "../../middleware/authorizations";

dotenv.config();
const router = express.Router();

const insertExpenses = `
        INSERT INTO northwind.expenses (id, date, category, amount, description)
        VALUES (?, ?, ?, ?, ?)
    `;

router.use(validateAutMiddleware(["admin", "configurator", "owner", "viewer"]));
router.get("/", async (req, res, next) => {
  try {
    const conn = await getConnection();
    const getExpensesBetweenDates = `SELECT *
            FROM northwind.expenses
            ORDER BY date DESC`;

    const [rows] = await conn.execute(getExpensesBetweenDates, []);

    return res.json({ data: rows });
  } catch (error) {
    res.json({ message: `there was an error ${error}` });
    return res.status(500).json({ message: "Expenses Error" });
  }
});

router.get(
  "/categories",
  validateAutMiddleware(["configurator"]),
  async (req, res, next) => {
    try {
      const result = await getCategories();

      return res.json({ data: result });
    } catch (error) {
      res.json({ message: `there was an error ${error}` });
      return res.status(500).json({ message: "Expenses Error" });
    }
  }
);

router.get("/dates", async (req, res, next) => {
  try {
    const from = req.query.from as string;
    const to = req.query.to as string;
    if (!from || !to) {
      return res
        .status(400)
        .json({ message: "Missing 'from' or 'to' query parameters" });
    }

    const conn = await getConnection();
    const getExpensesBetweenDates = `SELECT *
            FROM northwind.expenses
            WHERE date BETWEEN ? AND ?
            ORDER BY date ASC`;

    const [rows] = await conn.execute(getExpensesBetweenDates, [from, to]);

    return res.json({ data: rows });
  } catch (error) {
    res.json({ message: `there was an error ${error}` });
    return res.status(500).json({ message: "Expenses Error" });
  }
});

router.post(
  "/expenses",
  validateAutMiddleware(["admin", "configurator", "owner"]),
  async (req, res, next) => {
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

      const conn = await getConnection();
      const params = [amount, date, category, description || null];
      const [result]: any = await conn.execute(
        `INSERT INTO northwind.expenses (amount, date, category, description)
             VALUES (?, ?, ?, ?)`,
        params
      );
      const insertedId = result.insertId;

      return res.status(201).json({
        message: "Expense created successfully",
        id: insertedId,
      });
    } catch (error) {
      console.error("Failed to insert expense:", error);
      return res.status(500).json({ message: "expenses insert error" });
    }
  }
);

router.get("/sum-all-expenses", (req, res, next) => {
  //   return res.json({ total: result });
});

export default router;
