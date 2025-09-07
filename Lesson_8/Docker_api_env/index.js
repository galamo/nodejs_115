// index.js

const express = require('express');
const app = express();
require("dotenv").config()
const { PORT, MESSAGE_HC, SECRET } = process.env

function checkEnvParams() {
    if (!PORT || !MESSAGE_HC || !SECRET) {
        console.log('\x1b[31m%s\x1b[0m', 'MISSING ENV PARAMS');
    }
}
checkEnvParams()
// Health check endpoint
app.get('/hc', (req, res) => {
    res.send(`${MESSAGE_HC + new Date().toISOString()}`);
});

console.log(SECRET)
// Start server
app.listen(PORT || 3500, () => {
    console.log(`Server is running on port ${PORT}`);
});
