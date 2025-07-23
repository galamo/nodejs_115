import express, { Request, Response, NextFunction } from "express"
import { login } from "./loginHandler"
import { ERRORS } from "../../enum/httpStatus"
import * as z from "zod";
const router = express.Router()

export type User = z.infer<typeof User>

const User = z.object({
    userName: z.email().max(30),
    password: z.string().min(4).max(20)
});


export const users = [{ userName: "admin@gmail.com", password: "admin" }]

function loginInputValidation(req: Request, res: Response, next: NextFunction) {
    const validation = User.safeParse(req.body)
    if (!validation.success) {
        console.log(validation)
        throw new Error(ERRORS.BAD_REQUEST)
    } else {
        next()
    }
}
router.post("/login", loginInputValidation, (req, res, next) => {
    try {
        const { userName, password } = req.body
        const foundUser = login({ userName, password })
        if (foundUser) return res.json({ message: "User logged in successfully" })
        else throw new Error(ERRORS.UNAUTH)

    } catch (error) {
        console.log(error)
        return next(new Error((error as Error).message))
    }
})

router.post("/register", (req, res, next) => {
    res.send("test ok")
})


export default router;