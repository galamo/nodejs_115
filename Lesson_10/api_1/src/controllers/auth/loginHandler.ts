import { User, users } from "."
import getConnection from "../../db"

export async function login(user: User): Promise<any> {
    const params = [user.userName, user.password]
    const query = getLoginQuery()
    const result = await ((await getConnection())?.execute(query, params))
    console.log(result)
    //@ts-ignore
    return result[0] && result[0][0]
}

const getLoginQuery = () => {
    return 'SELECT * FROM users WHERE email = ? AND password = ?';
}