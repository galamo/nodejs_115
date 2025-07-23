import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000


app.get("/protected", (req, res, next) => {
    res.send("Talliya using notebook")
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
    } else {
        console.log(`Api is running on port ${PORT}`)
    }
})