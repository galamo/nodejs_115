// index.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/hc', (req, res) => {
    res.send('Ok_Server_Is_Running ' + new Date().toISOString());
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
