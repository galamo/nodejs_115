import mysql2 from "mysql2/promise"



async function getConnection() {
    try {
        const connection = await mysql2.createPool({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: Number(process.env.DB_PORT) || 3306,
            connectionLimit: 10
        })
        return connection

    } catch (error) {
        throw error;
    }
}


export default getConnection;