import expressAsyncHandler from "express-async-handler";
import { Request , Response } from "express";
import { resizeImage } from "../services/sharp.services";
import { prisma } from "../config/prisma";

type FileParams = {
    id:string
}

export const  resizeImagex  = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
    const {id} = req.params
    const file = await prisma.file.findUnique({
        where:{
            id
        }
    })

    if(!file){
        res.status(404).json({
            success:false,
            message:"file not exist",
        })
        return
    }

    await resizeImage(file.filePath , file.fileName )

     res.status(200).json({
      success: true,
      message: "Image resized successfully",
    });  return 
})