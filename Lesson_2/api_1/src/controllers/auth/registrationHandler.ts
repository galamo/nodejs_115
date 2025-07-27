import { User, UserRegister, users } from "."

export function register(user: UserRegister): boolean {
    const toLowerUserName = user.userName?.toLowerCase()
    const foundUser = users.find(u => u.userName === toLowerUserName)
    if (foundUser) {
        return false;
    } else {
        users.push(user)
        return true;
    }
}

