import getConnection from "../../db"

export async function getUserRole(userId: number): any {
    const params = [userId]
    const query = getUserRoleQuery()
    const result = await ((await getConnection()).execute(query, params))
    console.log(result)
    return result[0] && result[0][0]
}

const getUserRoleQuery = () => {
    return 'SELECT role FROM users_roles WHERE user_id = ?';
}