import expressAsyncHandler from "express-async-handler";
import { Request , Response } from "express";
import { resizeImage, blurImage , compositeImage , rotateImage , grayscaleImage , cropImage} from "../services/sharp.services";
import { prisma } from "../config/prisma";
import { uploadcloudinary , getCloudinaryBuffer } from "../services/cloudinary.service";

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

    const Imagebuffer = await getCloudinaryBuffer(file.fileUrl!)

   const processedPath =  await resizeImage(Imagebuffer , file.fileName )

   const cloudinaryResult = await uploadcloudinary(
    processedPath,
    file.fileName
   )

     const  processedFile = await prisma.file.create({
        data:{
        title:`Resize ${file.title}`,
       description:file.description,   
        OriginalName:file.OriginalName,
        fileName:file.fileName,
        fileUrl:cloudinaryResult.secure_url,
        publicId:cloudinaryResult.public_id,
        size:file.size,
        mimeType:"image/jpeg"
        }
     })

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

        const Imagebuffer = await getCloudinaryBuffer(file.fileUrl!)

   const processedPath = await blurImage(Imagebuffer, file.fileName )

     const cloudinaryResult = await uploadcloudinary(
    processedPath,
    file.fileName
   )

     const  processedFile = await prisma.file.create({
        data:{
        title:`Blur ${file.title}`,
       description:file.description,   
        OriginalName:file.OriginalName,
        fileName:file.fileName,
        fileUrl:cloudinaryResult.secure_url,
        publicId:cloudinaryResult.public_id,
        size:file.size,
        mimeType:"image/jpeg"
        }
     })

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

    const Imagebuffer = await getCloudinaryBuffer(file.fileUrl!)
    const Imagebufferx = await getCloudinaryBuffer(compfile.fileUrl!)
  const processedPath=  await compositeImage(Imagebuffer , file.fileName , Imagebufferx )

     const cloudinaryResult = await uploadcloudinary(
    processedPath,
    file.fileName
   )

     const  processedFile = await prisma.file.create({
        data:{
        title:`Composite ${file.title}`,
       description:file.description,   
        OriginalName:file.OriginalName,
        fileName:file.fileName,
        fileUrl:cloudinaryResult.secure_url,
        publicId:cloudinaryResult.public_id,
        size:file.size,
        mimeType:"image/jpeg"
        }
     })

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
   const Imagebuffer = await getCloudinaryBuffer(file.fileUrl!)
   const processedPath = await rotateImage(Imagebuffer , file.fileName )

      const cloudinaryResult = await uploadcloudinary(
    processedPath,
    file.fileName
   )

     const  processedFile = await prisma.file.create({
        data:{
        title:`Rotate ${file.title}`,
       description:file.description,   
        OriginalName:file.OriginalName,
        fileName:file.fileName,
        fileUrl:cloudinaryResult.secure_url,
        publicId:cloudinaryResult.public_id,
        size:file.size,
        mimeType:"image/jpeg"
        }
     })


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
const Imagebuffer = await getCloudinaryBuffer(file.fileUrl!)
 const  processedPath =  await grayscaleImage(Imagebuffer , file.fileName )

      const cloudinaryResult = await uploadcloudinary(
    processedPath,
    file.fileName
   )

     const  processedFile = await prisma.file.create({
        data:{
        title:`GrayscaleImage ${file.title}`,
       description:file.description,   
        OriginalName:file.OriginalName,
        fileName:file.fileName,
        fileUrl:cloudinaryResult.secure_url,
        publicId:cloudinaryResult.public_id,
        size:file.size,
        mimeType:"image/jpeg"
        }
     })

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
const Imagebuffer = await getCloudinaryBuffer(file.fileUrl!)
const processedPath =    await cropImage(Imagebuffer , file.fileName )



      const cloudinaryResult = await uploadcloudinary(
    processedPath,
    file.fileName
   )

     const  processedFile = await prisma.file.create({
        data:{
        title:`CropImage ${file.title}`,
       description:file.description,   
        OriginalName:file.OriginalName,
        fileName:file.fileName,
        fileUrl:cloudinaryResult.secure_url,
        publicId:cloudinaryResult.public_id,
        size:file.size,
        mimeType:"image/jpeg"
        }
     })

     res.status(200).json({
      success: true,
      message: "Image cropped successfully",
    });  return 
})

