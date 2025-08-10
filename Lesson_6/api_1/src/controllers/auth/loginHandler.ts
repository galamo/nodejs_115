import { User, users } from "."
export function login(user: User): Partial<User> | undefined {
    const toLowerUserName = user.userName?.toLowerCase()
    const foundUser = users.find(u => u.userName === toLowerUserName && u.password === user.password)
    return foundUser;
}

// this function will query DB