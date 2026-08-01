import expressAsyncHandler from "express-async-handler";
import { Request , Response } from "express";
import { resizeImage, blurImage , compositeImage , rotateImage , grayscaleImage , cropImage} from "../services/sharp.services";
import { prisma } from "../config/prisma";

type FileParams = {
    id:string,
    oid:string,
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

export const  blurImagex  = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
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

    await blurImage(file.filePath , file.fileName )

     res.status(200).json({
      success: true,
      message: "Image blured successfully",
    });  return 
})

export const  compositeImagex  = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
    const {id , oid} = req.params
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

      const compfile = await prisma.file.findUnique({
        where:{
            id:oid,
        }
    })

    if(!compfile){
        res.status(404).json({
            success:false,
            message:"file not exist",
        })
        return
    }


    await compositeImage(file.filePath , file.fileName , compfile.filePath )

     res.status(200).json({
      success: true,
      message: "Image composed successfully",
    });  return 
})

export const  rotateImagex  = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
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

    await rotateImage(file.filePath , file.fileName )

     res.status(200).json({
      success: true,
      message: "Image rotated successfully",
    });  return 
})

export const  grayscaleImagex = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
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

    await grayscaleImage(file.filePath , file.fileName )

     res.status(200).json({
      success: true,
      message: "Image grayScaled successfully",
    });  return 
})

export const  cropImagex = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
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

    await cropImage(file.filePath , file.fileName )

     res.status(200).json({
      success: true,
      message: "Image cropped successfully",
    });  return 
})

