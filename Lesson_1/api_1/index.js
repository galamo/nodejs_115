const express = require("express")
const PORT = 3000
const app = express();


app.get("/hc", (req, res, next) => {
    const queryParams = req.query;
    res.send({ message: `Api is up _ ${new Date().toISOString()}` })
})


app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
    } else {
        console.log(`Api is running on port ${PORT}`)
    }
})