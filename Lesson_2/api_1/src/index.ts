import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import apiToken from "./middleware/api.token";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000

app.use((req, res, next) => {
    console.log(`[Start ${new Date().toISOString()}]=>${req.originalUrl}`)
    next()
    res.on("finish", () => {
        console.log(`[Finish ${new Date().toISOString()}]=>${req.originalUrl}`)
    })
})
app.use(apiToken)

app.get("/protected", (req, res, next) => {
    res.send("Talliya using notebook")
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    switch (error.message) {
        case "UNAUTH": {
            return res.status(401).send("Unauthorized___")
        }
        default: {
            return res.status(500).send("Something went wrong Yam is working to fix it & flight to America")
        }
    }

})


app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
    } else {
        console.log(`Api is running on port ${PORT}`)
    }
})