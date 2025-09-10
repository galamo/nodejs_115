import { QueryResult } from "mysql2";
import getConnection from "../../db";
export async function getUserDetails(userId: number) {
    const queryResult = await (await getConnection())?.execute(getQuery(), [userId])
    //@ts-ignore
    return queryResult[0][0] as QueryResult
}
const getQuery = () => {
    return `SELECT 
            u.email, u.id, r.role
        FROM
            northwind.users as u
                JOIN
            users_roles as r ON u.id = r.user_id
        WHERE
        u.id = ?`
}