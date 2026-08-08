import { prisma } from "../config/prisma"
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { uservalidations, RegisterBody } from "../validations/user.vali";
import { loginvalidations ,  RegisterBodyx } from "../validations/login.vali";
import jwt from "jsonwebtoken"





export const signup = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    try {

        const result = uservalidations.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                errors: result.error.flatten().fieldErrors,
            })
        }

        const existingUser = await prisma.user.findUnique({
            where:{
            email: result.data.email,
            }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashpass = await bcrypt.hash(result.data.password, 10)

        const created = await prisma.user.create({
           data:{
             username:result.data.username,
             email:result.data.email,
             password:hashpass
           }
        })

        if (!process.env.JWT_SECRET) {
            throw new Error("Jwt not configured");
        }

        const token = jwt.sign(
            {
                id: created.id,

            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 7 * 1000 * 60 * 60 * 24,
        })

        return res.status(201).json({
            success: true,
            message: "Successfully SignUp",
            userId: created.id,
        })




    } catch (error: any) {
        console.error("Error in SignUp", error)
        return res.status(500).json({
            success: false,
            message: "Server Error",
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {

        const result = loginvalidations.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                errors: result.error.flatten().fieldErrors,
            })
        }
    
                const user = await prisma.user.findUnique({where:{ email:result.data.email }})

    if (!user) {
         res.status(404).json({
            success: false,
            message: "User doesn't  Exist"
        })
        return
    }

    const correctPass = await bcrypt.compare(result.data.password, user.password);

    if (!correctPass) {
        res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        })
         return
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("jwt not configured")
    }

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
    )

    res.cookie("token", token, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 7 * 1000 * 24 * 60 * 60,
    })

    return res.status(200).json({
        success: true,
        message: "Login Successfully",
        user: {
            id: user.id,
            email: user.email,
            username: user.username
        }
    })

    


} catch (error) {
    console.error("Error in Login", error)
    res.status(500).json({
        success: false,
        message: "Server Error",
    })
     return
}

}

export const logout = async (req: Request, res: Response) => {
    res.cookie("token", "", { maxAge: 0 });
    res.json({ message: "logout Successfull" })
}