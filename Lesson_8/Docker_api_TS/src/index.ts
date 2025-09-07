import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || '3500'; // Default to string for compatibility with env vars
const MESSAGE_HC = process.env.MESSAGE_HC;
const SECRET = process.env.SECRET;

function checkEnvParams(): void {
    if (!PORT || !MESSAGE_HC || !SECRET) {
        console.error('\x1b[31m%s\x1b[0m', 'MISSING ENV PARAMS');
    }
}

checkEnvParams();

// Health check endpoint
app.get('/hc', (_req: Request, res: Response) => {
    res.send(`${MESSAGE_HC}${new Date().toISOString()}`);
});

console.log(`SECRET: ${SECRET}`);

// Start server
app.listen(Number(PORT), () => {
    console.log(`Server is running on port ${PORT}`);
});
