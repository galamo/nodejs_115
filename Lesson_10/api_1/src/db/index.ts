import mysql2 from "mysql2/promise";
let retriesConnections = 5;
let numberOfRetry = 0;
async function getConnection() {
    try {
        const connections = await mysql2.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: Number(process.env.DB_PORT) || 3306,
            connectionLimit: 10,
        });
        const g = await connections.getConnection();
        await g.ping();
        console.log('✅ MySQL pool connected successfully.');
        return connections;
    } catch (error) {
        await new Promise(resolve => setTimeout(resolve, 10_000));
        if (numberOfRetry !== retriesConnections) {
            console.log("+++++++++++++++++++++++++++++++++")
            console.log("+++++++++++++++++++++++++++++++++")
            numberOfRetry++;
            getConnection()
        } else {
            console.log("==================")
            console.log("==================")
            process.exit(1)
        }
        console.log(error)
    }
}

export default getConnection;
