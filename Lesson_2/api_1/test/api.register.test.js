const chai = require("chai")
const { expect } = chai;
const axios = require("axios")

const URL = "http://localhost:3000/auth/"

describe("Test Register API POST /register", () => {
    it("register is completed", async () => {
        const result = await axios.post(URL + "register", {
            "userName": "Bart11@gmail.com",
            "age": 20,
            "password": "1234ww",
            "phone": "|sdsfsfs"
        })
        const data = result.data;
        expect(result.status).equal(200)
        expect(data.message).equal("User Registered in successfully")
    })
    it("register - bad request", async () => {
        try {
            const result = await axios.post(URL + "register", {
                "age": 20,
                "password": "1234ww",
                "phone": "|sdsfsfs"
            })
            throw new Error({ status: 500 })
        } catch (error) {
            expect(error.status).equal(400)
        }
    })
    it("register - user already exist", async () => {
        try {
            await axios.post(URL + "register", {
                "userName": "Bart@gmail.com",
                "age": 20,
                "password": "1234ww",
                "phone": "|sdsfsfs"
            })
            const result = await axios.post(URL + "register", {
                "userName": "Bart@gmail.com",
                "age": 20,
                "password": "1234ww",
                "phone": "|sdsfsfs"
            })
            throw new Error(200)
        } catch (error) {
            expect(error.status || error).equal(500)
        }


    })
    after(async () => {
        const result = await axios.delete(URL + "clean")
    });
})




