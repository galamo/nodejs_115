import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import getConnection from "../../db";

dotenv.config();
const router = express.Router();
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

router.get("/reset", async (req, res, next) => {
  try {
    const conn = await getConnection();
    await conn.execute("DROP TABLE IF EXISTS northwind.expenses");
    await conn.execute(createExpensesTable(), []);
    // const result = await (await getConnection()).execute(createExpensesTable(), []);

    for (const exp of expensesLastWeek) {
      await conn.execute(insertExpenses, [
        exp.id,
        exp.date,
        exp.category,
        exp.amount,
        exp.description,
      ]);
    }

    res.json({ message: "expenses table reset completed!" });
  } catch (error) {
    res.json({ message: `there was an error ${error}` });
  }
  res.json({ expensesLastWeek });
});

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

router.post("/expenses", async (req, res, next) => {
  try {
    const { amount, category, date, description } = req.body;
    if (!amount || !category || !date) {
      return res
        .status(400)
        .json({ message: "Missing required fields: amount, category or date" });
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
});

router.get("/sum-all-expenses", (req, res, next) => {
  const result = sumTotal(expensesLastWeek);
  return res.json({ total: result });
});
// classic use case for unit test
export function sumTotal(expensesArray: Array<(typeof expensesLastWeek)[0]>) {
  if (!expensesArray) return;

  const total = expensesArray.reduce((acc, current) => {
    return acc + current.amount;
  }, 0);
  return total;
}

export default router;
