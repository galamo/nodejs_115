// index.js

const express = require('express');
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 3500;

// Health check endpoint
app.get('/hc', (req, res) => {
    res.send(`${process.env.MESSAGE_HC + new Date().toISOString()}`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
