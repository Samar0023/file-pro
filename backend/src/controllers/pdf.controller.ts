import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { getCloudinaryBuffer, uploadcloudinary } from "../services/cloudinary.service";
import { createPdf, mergePdf, splitPdf } from "../services/pdf.services";
import { pdfname } from "../utils/pdf.util";
import { prisma } from "../config/prisma";
import cloudinary from "../config/cloudinary";
type FileParams = {
    id: string
}


export const createPdfx = expressAsyncHandler(async (req: Request<FileParams>, res: Response) => {
    const { id } = req.params;
    const { fileIds } = req.body;
    const files = await prisma.file.findMany({
        where: {
            id: {
                in: fileIds,
            }
        }
    })

    if (files.length === 0) {
        res.status(404).json({
            success: false,
            message: "no files found"
        })
        return
    }

    const pdfbuffer = await createPdf(files)



    const cloudinaryResult = await uploadcloudinary(
        pdfbuffer,
        pdfname
    )

    const processedFile = await prisma.file.create({
        data: {
            title: "Generated Pdf",
            description: "PDF created from images",
            OriginalName: pdfname,
            fileName: pdfname,
            fileUrl: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id,
            size: pdfbuffer.length,
            mimeType: "application/pdf"
        }
    })

    res.status(201).json({
        success: true,
        message: "PDF created Successfully"
    })
    return
})

export const mergePdfx = expressAsyncHandler(async (req: Request<FileParams>, res: Response) => {
    const { id } = req.params
    const { fileIds } = req.body

    const file = await prisma.file.findMany({
        where: {
            id: {
                in: fileIds
            }
        }
    })
    if (file.length === 0) {
        res.status(404).json({
            success: false,
            message: "no files found"
        })
        return
    }

    const pdfbuffer = await mergePdf(file)




    const cloudinaryResult = await uploadcloudinary(
        pdfbuffer,
        pdfname
    )

    const processedFile = await prisma.file.create({
        data: {
            title: "Generated Pdf",
            description: "PDF created from images",
            OriginalName: pdfname,
            fileName: pdfname,
            fileUrl: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id,
            size: pdfbuffer.length,
            mimeType: "application/pdf"
        }
    })

    res.status(201).json({
        success: true,
        message: "PDF created Successfully"
    })
    return



})

export const splitPdfx = expressAsyncHandler(async (req: Request<FileParams>, res: Response) => {
    const { id } = req.params


    const file = await prisma.file.findUnique({
        where: {
            id
        }
    })
    if (!file) {
        res.status(404).json({
            success: false,
            message: "no files found"
        })
        return
    }

    const pdfbuffer = await splitPdf(file)

for(let i = 0 ; i < pdfbuffer.length ; i++){
    const cloudinaryResult = await uploadcloudinary(
        pdfbuffer[i],
        `split-page-${i+1}.pdf`
    )

     await prisma.file.create({
        data:{
            title:`Split page ${i+1}`,
            description:"Split PDF page",

            OriginalName:`split-page-${i+1}.pdf`,
            fileName:`split-page-${i+1}.pdf`,

            fileUrl:cloudinaryResult.secure_url,
            publicId:cloudinaryResult.public_id,

            size:pdfbuffer[i].length,
            mimeType:"application/pdf"
        }
          });
}
 
    
 
    res.status(201).json({
        success: true,
        message: "PDF Splitted Successfully"
    })
    return



})