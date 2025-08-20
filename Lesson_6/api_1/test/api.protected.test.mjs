// import { describe, it, before } from "mocha";
// import { expect } from "chai";
// import jwt from "jsonwebtoken";
// import axios from "axios";
// const URL = "http://localhost:3000/api/expenses";
// let token = null;
// before(async () => {
//     token = jwt.sign(
//         { userName: "foundUser.userName", isAdmin: true },
//         "eitanTheKingLikeFish" || "secret",
//         { expiresIn: "1m" }
//     );
// });

// describe("GET /api/expenses", () => {
//     it("should return status 200 and the protected message", async () => {
//         const res = await axios.get(`${URL}`, {
//             headers: { authorization: `${token}` },
//         });
//         expect(res.status).to.equal(200);
//     });
// });
