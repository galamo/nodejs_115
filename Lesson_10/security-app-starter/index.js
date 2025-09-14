// server.js

const express = require('express');
const path = require('path');
const app = express();

const PORT = 3001;

// Serve static files from React build
const staticPath = path.join(__dirname, 'dist');

app.use(express.static(staticPath));
// Catch-all route to serve index.html (for React Router)
app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
