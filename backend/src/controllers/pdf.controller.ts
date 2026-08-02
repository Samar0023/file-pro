import expressAsyncHandler from "express-async-handler";
import { Request , Response } from "express";
import { createPdf , mergePdf , splitPdf } from "../services/pdf.services";
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

export const mergePdfx = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
    const {id} = req.params
    const fileIds = req.body
    
    const file = await prisma.file.findMany({
        where:{
            id:{
                in:fileIds
            }
        }
    })
     if(file.length === 0){
        res.status(404).json({
            success:false,
            message:"no files found"
        })
        return
     }

     await mergePdf(file , pdfname)
  res.status(201).json({
            success:true,
            message:"PDF created Successfully"
        })
        return
        
     

})

export const splitPdfx = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
    const {id} = req.params
    
    
    const file = await prisma.file.findUnique({
        where:{
            id
        }
    })
     if(!file){
        res.status(404).json({
            success:false,
            message:"no files found"
        })
        return
     }

     await splitPdf(file , pdfname)
  res.status(201).json({
            success:true,
            message:"PDF Splitted Successfully"
        })
        return
        
     

})