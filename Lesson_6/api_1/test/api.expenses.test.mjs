import { expect } from "chai";
import axios from "axios";
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "http://localhost:3000/api/expenses";
let testUserID;
let dbConnection;

describe("Test Login API POST /Login", () => {
  before(async () => {
    dbConnection = await mysql2.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: Number(process.env.DB_PORT) || 3306,
      multipleStatements: true,
    });
  });

  after(async () => {
    if (dbConnection) {
      await dbConnection.end();
    }
  });

  it("GET /expenses/expenses - expenses between dates", async () => {
    const sql = `
      INSERT INTO expenses (amount, date, category, description)
      VALUES (?, ?, ?, ?)
    `;
    const amount = (Math.random() * 500).toFixed(2); // random 0 - 500
    const expenseDate = dateMonthsAgo(1);
    const category = `Office Supplies ${Date.now()}`;
    const description = `Dummy expense ${Date.now()}`;

    const [result] = await dbConnection.execute(sql, [
      amount,
      expenseDate,
      category,
      description,
    ]);
    const res = await axios.get(`${BASE_URL}/`, {
      params: {
        from: dateMonthsAgo(2),
        to: dateMonthsAgo(0),
      },
    });
    expect(res.status).to.equal(200);
    expect(res.data.data).to.be.an("array");
    expect(res.data.data.length).to.be.greaterThan(0);

    const sqlCleanup = `DELETE FROM northwind.expenses where id = ?`;
    await await dbConnection.execute(sqlCleanup, [result.insertId.toString()]);
  });

  //   it("POST /expenses/expenses - insert new expenes", async () => {
  //     const randomAmount = parseFloat(
  //       (Math.random() * (999 - 10) + 10).toFixed(2)
  //     );
  //     const newExpense = {
  //       amount: randomAmount,
  //       category: "TestCategory",
  //       date: "2025-08-15",
  //       description: "Test expense entry",
  //     };

  //     const res = await axios.post(`${BASE_URL}/expenses`, newExpense);

  //     expect(res.status).to.equal(201);
  //     expect(res.data).to.have.property("id");
  //     const insertedId = res.data.id;
  //     console.log(
  //       `[Expenses] Inserted new row, ID: ${insertedId}, amount:${randomAmount}`
  //     );
  //     const [rows] = await dbConnection.execute(
  //       `SELECT * FROM northwind.expenses WHERE id = ?`,
  //       [insertedId]
  //     );

  //     expect(rows).to.have.lengthOf(1);
  //   });
});

function randomDateBetweenTwoAndOneMonthAgo() {
  const now = new Date();
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(now.getMonth() - 2);

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);

  const start = twoMonthsAgo.getTime();
  const end = oneMonthAgo.getTime();
  const randomTime = start + Math.random() * (end - start);

  return new Date(randomTime);
}

function dateMonthsAgo(monthsAgo) {
  const now = new Date();

  // Clone current date
  const past = new Date(now);
  past.setMonth(now.getMonth() - monthsAgo);

  // Format for MySQL: YYYY-MM-DD HH:MM:SS
  const mysqlDatetime = past.toISOString().slice(0, 19).replace("T", " ");

  return mysqlDatetime;
}
