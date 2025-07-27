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

const UserRegister = z.object({
    userName: z.email().max(30),
    password: z.string().min(4).max(20),
    age: z.number(),
    phone: z.string()
});

const fp = z.object({
    userName: z.email().max(30)
}).strict()


export const users = [{ userName: "admin@gmail.com", password: "admin" }]



const mappingSchemaValidation: { [key: string]: z.ZodSchema } = {
    login: User,
    register: UserRegister,
    "forgat-password": fp
}

function authInputValidation(req: Request, res: Response, next: NextFunction) {
    const url = req.url.replace("/", "");
    console.log(url, mappingSchemaValidation[url])
    const currentSchema = mappingSchemaValidation[url]
    const validation = currentSchema.safeParse(req.body)
    if (!validation.success) {
        console.log(validation)
        throw new Error(ERRORS.BAD_REQUEST)
    } else {
        next()
    }
}



router.post("/login", authInputValidation, (req, res, next) => {
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

router.post("/register", authInputValidation, (req, res, next) => {
    try {
        const { userName, password, phone, age } = req.body
        const foundUser = login({ userName, password })
        if (foundUser) return res.json({ message: "User logged in successfully" })
        else throw new Error(ERRORS.UNAUTH)

    } catch (error) {
        console.log(error)
        return next(new Error((error as Error).message))
    }
})


router.post("/forgat-password", authInputValidation, (req, res, next) => {
    try {
        const { userName } = req.body
        if (userName) return res.json({ message: "password reset!" })
        else throw new Error(ERRORS.UNAUTH)

    } catch (error) {
        console.log(error)
        return next(new Error((error as Error).message))
    }
})


export default router;