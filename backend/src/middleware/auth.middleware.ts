import jwt from "jsonwebtoken"
import { Response, Request, NextFunction } from "express"
import expressAsyncHandler from "express-async-handler"
import { prisma } from "../config/prisma"

 interface DecodedToken{
    id:string
 }
export const authmiddleware = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction):Promise <void> => {
    try{
        console.log("Cookies:", req.cookies);
console.log("Headers:", req.headers.cookie);
        console.log(req.cookies);
    const token = req.cookies?.token

    if (!token) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        })
        return;
    }

     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken
     
     const user = await prisma.user.findUnique({
        where:{
            id:decoded.id,
        },
        select:{
            id:true,
            email:true,
            username:true,
        }
     })

        if(!user){
            res.status(404).json({
                success:false,
                message:"User not found"
            });
            return 
        }

        req.user = user

        next()
    }
 catch(error: any){
        res.status(401).json({
      success: false,
      message: "Invalid token",
     });
     return
    }

    })