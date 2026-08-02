import expressAsyncHandler from "express-async-handler"
import { Request , Response } from "express"
import {prisma} from "../config/prisma"
import crypto from "crypto"


 type FileParams ={
    id:string
 }
export const sharefile = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
      const {id} = req.params;

      const file = await prisma.file.findUnique({
          where:{
            id,
          }
      })

       if(!file){
           res.status(404).json({
              success:false,
              message:"File not found"
           })
           return 
       }

       const token = crypto.randomBytes(32).toString("hex");

       const sharelink = await prisma.shareLink.create({
        data:{
            fileId:file.id,
            token
        }
       })

       res.status(201).json({
        success:true,
        url: `${process.env.BASE_URL}/api/share/${sharelink.token}`
       })
})