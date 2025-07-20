const express = require("express")
const PORT = 3000
const app = express();




app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}]=>${req.originalUrl}`)
    next()
})

app.get("/hc", (req, res, next) => {
    res.json({ message: `Api is up _ ${new Date().toISOString()}` })
})

app.use((req, res, next) => {
    const key = req.query.key
    if (key === "api_token") {
        return next()
    } else {
        return next(new Error("UNAUTH"))
    }

})

app.get("/users", (req, res, next) => {
    res.json({ message: "users" })
})



app.use((error, req, res, next) => {
    switch (error.message) {
        case "UNAUTH": {
            return res.status(401).send("Unauthorized___")
        }
        default: {
            return res.status(500).send("Something went wrong Yam is working to fix it & flight to America")
        }
    }

})

// GET // /users/:id
// DELETE /users/:id
// POST /login {user:1,email:2,password:l}
// PUT /users:id {user:1,email:2,password:l}
// OPTIONS
// HEAD 

app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
    } else {
        console.log(`Api is running on port ${PORT}`)
    }
})