// const chai = require("chai")
import { expect } from "chai";
import axios from "axios";
// const { expect } = chai;
// const axios = require("axios");

const URL = "http://localhost:3000/auth/";

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
});


// insert dummy user into db
// Call HTTP /POST login
// Assert result
// Delete User
// Finish