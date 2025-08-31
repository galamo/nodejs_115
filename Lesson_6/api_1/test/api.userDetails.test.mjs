import { expect } from "chai";
import axios from "axios";
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const BASE_URL = "http://localhost:3000/api/user/details";

const axiosInstanceApi = axios.create({
  baseURL: BASE_URL,
});

let dbConnection;

describe("Test User details", () => {
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

  it("GET /api/user/details - get user admin details", async () => {
    const password = "not_relevant";
    const dummyRandomUserName = `dummy${Math.ceil(
      Math.random() * 999999
    )}@gmail.com`;
    const getInsertUserQuery = `INSERT INTO northwind.users (email, password) VALUES (?,?);`;
    const queryResult1 = await dbConnection.execute(getInsertUserQuery, [
      dummyRandomUserName,
      password,
    ]);
    const getInsertRoleQuery = `INSERT INTO northwind.users_roles (user_id, role) VALUES (?, ?);`;
    await dbConnection.execute(getInsertRoleQuery, [
      queryResult1[0].insertId,
      "admin",
    ]);

    const result = await axiosInstanceApi.get(BASE_URL, {
      headers: {
        Authorization: createToken("admin", queryResult1[0].insertId),
      },
    });
    expect(result.data.email).equal(dummyRandomUserName);
    expect(result.data.role).equal("admin");

    const sqlCleanup = `DELETE FROM northwind.users where id = ?`;
    await dbConnection.execute(sqlCleanup, [queryResult1[0].insertId]);
  });
});

function createToken(role, userId) {
  return jwt.sign(
    { userId, userName: "foundUser.userName", role, isAdmin: role === "admin" },
    process.env.SECRET || "secret",
    { expiresIn: "1m" }
  );
}
