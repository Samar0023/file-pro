import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { getCloudinaryBuffer, uploadcloudinary } from "../services/cloudinary.service";
import { createPdf, mergePdf, splitPdf } from "../services/pdf.services";
import { pdfname } from "../utils/pdf.util";
import { prisma } from "../config/prisma";
import cloudinary from "../config/cloudinary";
import { pdfQueue } from "../queue/queue";
import { date } from "zod";
import { Job } from "bullmq";
type FileParams = {
    id: string
}


export const createPdfx = expressAsyncHandler(async (req: Request<FileParams>, res: Response) => {
    const { id } = req.params;
    const { fileIds } = req.body;
  

    const dbJob = await prisma.processingJob.create({
        data:{
             userId:req.user.id,
        type:"create-pdf",
        status:"PENDING"
        }
    })

    const job = await pdfQueue.add(
        "create-pdf",
        {
            fileIds,
            userId:req.user.id,
            dbJobId:dbJob.id
        }
    )



   
    res.status(201).json({
        success: true,
        message: "PDF created Successfully",
        jobId:job.id
    })
    return
})

export const mergePdfx = expressAsyncHandler(async (req: Request<FileParams>, res: Response) => {
    const { id } = req.params
    const { fileIds } = req.body

    const dbJob = await prisma.processingJob.create({
        data:{
             userId:req.user.id,
        type:"merge-pdf",
        status:"PENDING"
        }
    })

    const job = await pdfQueue.add(
        "merge-pdf",
        {
            fileIds,
            userId:req.user.id,
            dbJobId:dbJob.id
        }
    )

    
    res.status(201).json({
        success: true,
        message: "PDF merged Successfully",
         jobId:job.id
    })
    return



})

export const splitPdfx = expressAsyncHandler(async (req: Request<FileParams>, res: Response) => {
    const { id , } = req.params
    const {fileId} = req.body


    

   const dbJob = await prisma.processingJob.create({
        data:{
             userId:req.user.id,
        type:"split-pdf",
        status:"PENDING"
        }
    })

    const job = await pdfQueue.add(
        "split-pdf",
        {
            fileId,
            userId:req.user.id,
            dbJobId:dbJob.id
        }
    )
  



 
    
 
    res.status(201).json({
        success: true,
        message: "PDF Splitted Successfully",
        
    })
    return



})