import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import apiToken from "./middleware/api.token";
import requestDuration from "./middleware/requestDuration";
import limiter from "./middleware/rateLimiter"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000


app.use(requestDuration)
app.use(apiToken)
app.use(limiter)

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