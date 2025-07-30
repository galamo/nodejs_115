import express, { Request, Response, NextFunction } from "express"
import { login } from "./loginHandler"
import { ERRORS } from "../../enum/httpStatus"
import * as z from "zod";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { register } from "./registrationHandler";
dotenv.config()
const router = express.Router()


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


export type User = z.infer<typeof User>
export type UserRegister = z.infer<typeof UserRegister>


export let users: Array<Partial<UserRegister>> = [{ userName: "admin@gmail.com", password: "admin" }]

const mappingSchemaValidation: { [key: string]: z.ZodSchema } = {
    login: User,
    register: UserRegister,
    "forgat-password": fp
}

function authInputValidation(req: Request, res: Response, next: NextFunction) {
    const url = req.url.replace("/", "");
    const currentSchema = mappingSchemaValidation[url]
    const validation = currentSchema.safeParse(req.body)
    if (!validation.success) {
        throw new Error(ERRORS.BAD_REQUEST)
    } else {
        next()
    }
}



router.post("/login", authInputValidation, (req, res, next) => {
    try {
        const { userName, password } = req.body
        const foundUser = login({ userName, password })
        if (foundUser) {
            console.log(process.env.SECRET)
            const token = jwt.sign({ userName: foundUser.userName, isAdmin: true, }, process.env.SECRET as string || "secret", { expiresIn: '1m' }
            );
            // sign JWT token for user
            return res.setHeader("Authorization", token).json({ message: "User logged in successfully", token })
        }
        else throw new Error(ERRORS.UNAUTH)

    } catch (error) {
        console.log(error)
        return next(new Error((error as Error).message))
    }
})

router.post("/register", authInputValidation, (req, res, next) => {
    try {
        const { userName, password, phone, age } = req.body
        const result = register({ userName, password, phone, age })
        if (result) return res.json({ message: "User Registered in successfully" })
        // else return res.json({ message: "User Registered in successfully" })
        else throw new Error("user already exist")


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

// THIS IS NOT PRODUCTION FUNCTION ONLY FOR TESTING
router.delete("/clean", (req, res, next) => {
    users = [];
    console.log("DELETED ", users)
    res.send("deleted")
})


export default router;