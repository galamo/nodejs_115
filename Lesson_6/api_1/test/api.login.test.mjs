// const chai = require("chai")
import { expect } from "chai";
import axios from "axios";
import mysql2 from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()
// const { expect } = chai;
// const axios = require("axios");

const URL = "http://localhost:3000/auth/";

let connection;
before(async function () {
    try {
        connection = await mysql2.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: Number(process.env.DB_PORT) || 3306
        })



    } catch (error) {
        throw error;
    }
})

describe("Test Login API POST /Login", () => {
    it("login - bad request, user name is missing", async () => {
        try {
            const result = await axios.post(URL + "login", {
                password: "1234ww",
            });
            throw new Error({ status: 500 });
        } catch (error) {
            expect(error.status).equal(400);
        }
    });
    it("login - failed authenticating user", async () => {
        try {
            const result = await axios.post(URL + "login", {
                password: "password_not_exist",
                userName: "email_not_exist@gmail.com",
            });
            throw new Error({ status: 500 });
        } catch (error) {
            expect(error.status).equal(401);
        }
    });
    it("login - success authenticating user", async () => {
        const password = "not_relevant"
        const dummyRandomUserName = `dummy${Math.ceil(Math.random() * 999)}@gmail.com`
        const getInsertQuery = () => {
            return `INSERT INTO northwind.users (email, password) VALUES (?,?);`
        }
        const queryResult = await connection.execute(getInsertQuery(), [dummyRandomUserName, password])
        const idToDelete = queryResult[0].insertId
        const result = await axios.post(URL + "login", {
            password,
            userName: dummyRandomUserName,
        });
        expect(result.status).equal(200);
        const getDeleteQuery = () => {
            return `DELETE FROM users WHERE id = ?`
        }
        await connection.execute(getDeleteQuery(), [idToDelete])
    });

});


// insert dummy user into db
// Call HTTP /POST login
// Assert result
// Delete User
// Finish