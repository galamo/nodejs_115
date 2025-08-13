import { User, users } from "."
import getConnection from "../../db"

export async function login(user: User): any {
    const params = [user.userName, user.password]
    const query = getLoginQuery()
    const result = await ((await getConnection()).execute(query, params))
    console.log(result)
    return result[0] && result[0][0]
}

const getLoginQuery = () => {
    return 'SELECT * FROM users WHERE email = ? AND password = ?';
}