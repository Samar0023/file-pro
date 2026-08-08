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

    const {height , width} = req.body;
    const {id} = req.params
    const file = await prisma.file.findFirst({
        where:{
            id,
            userId:req.user.id,
        }
    })


    if(!file){
        res.status(404).json({
            success:false,
            message:"file not exist",
        })
        return
    }

    if (!width || !height) {
  res.status(400).json({
    success: false,
    message: "Width and height are required",
  });
  return;
}

    const Imagebuffer = await getCloudinaryBuffer(file.fileUrl!)

   const processedBuffer =  await resizeImage(Imagebuffer , file.fileName ,  Number(width),  Number(height))

   const cloudinaryResult = await uploadcloudinary(
    processedBuffer,
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
        userId:req.user.id,
        size:file.size,
        mimeType:"image/jpeg"
        }
     })

     res.status(200).json({
      success: true,
      message: "Image resized successfully",
      data:processedFile
    });  return 
})

export const  blurImagex  = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
    const {id} = req.params
    const file = await prisma.file.findFirst({
        where:{
            id,
             userId:req.user.id,
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
        userId:req.user.id,
        fileUrl:cloudinaryResult.secure_url,
        publicId:cloudinaryResult.public_id,
        size:file.size,
        mimeType:"image/jpeg"
        }
     })

     res.status(200).json({
      success: true,
      message: "Image blured successfully",
      data:processedFile
    });  return 
})

export const  compositeImagex  = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
    const {id , oid} = req.params
    const file = await prisma.file.findFirst({
        where:{
            id,
             userId:req.user.id,
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
             userId:req.user.id,
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
        userId:req.user.id,
        publicId:cloudinaryResult.public_id,
        size:file.size,
        mimeType:"image/jpeg"
        }
     })

     res.status(200).json({
      success: true,
      message: "Image composed successfully",
      data:processedFile
    });  return 
})

export const  rotateImagex  = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
    const {rotation} = req.body

    
    const {id} = req.params
    const file = await prisma.file.findFirst({
        where:{
            id,
             userId:req.user.id,
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
   const processedPath = await rotateImage(Imagebuffer , file.fileName , Number(rotation))

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
        userId:req.user.id,
        publicId:cloudinaryResult.public_id,
        size:file.size,
        mimeType:"image/jpeg"
        }
     })


     res.status(200).json({
      success: true,
      message: "Image rotated successfully",
      data:processedFile
    });  return 
})

export const  grayscaleImagex = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{
    const {id} = req.params
    const file = await prisma.file.findFirst({
        where:{
            id,
             userId:req.user.id,
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
        userId:req.user.id,
        size:file.size,
        mimeType:"image/jpeg"
        }
     })

     res.status(200).json({
      success: true,
      message: "Image grayScaled successfully",
      data:processedFile
    });  return 
})

export const  cropImagex = expressAsyncHandler(async(req:Request<FileParams> , res:Response)=>{

    const {width , height , top , left} = req.body;
    const {id} = req.params
    const file = await prisma.file.findFirst({
        where:{
            id,
              userId:req.user.id,
        }
    })

    

    if(!file){
        res.status(404).json({
            success:false,
            message:"file not exist",
        })
        return
    }

    if(!width || !height || !top || !left){
    res.status(400).json({
            success:false,
            message:"Particular Information is Required",
        })
        return
    }

const Imagebuffer = await getCloudinaryBuffer(file.fileUrl!)
const processedBuffer =    await cropImage(Imagebuffer , file.fileName , width , height , left , top )



      const cloudinaryResult = await uploadcloudinary(
     processedBuffer,
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
        userId:req.user.id,
        mimeType:"image/jpeg"
        }
     })

     res.status(200).json({
      success: true,
      message: "Image cropped successfully",
      data:processedFile
    });  return 
})

