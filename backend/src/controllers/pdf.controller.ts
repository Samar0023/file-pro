import expressAsyncHandler from "express-async-handler";
import { Request , Response } from "express";
import { createPdf } from "../services/pdf.services";
import { pdfname } from "../utils/pdf.util";
import { prisma } from "../config/prisma";
type FileParams = {
    id:string
}


export const createPdfx = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
     const {id} = req.params;
  const {fileIds} = req.body;
     const files = await prisma.file.findMany({
        where:{
            id:{
                in:fileIds,
            }
        }
     })

     if(files.length === 0){
        res.status(404).json({
            success:false,
            message:"no files found"
        })
        return
     }

   await createPdf(files , pdfname)
 
     res.status(201).json({
            success:true,
            message:"PDF created Successfully"
        })
        return
})