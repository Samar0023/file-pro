import { prisma } from "../config/prisma"
import { Request, Response } from "express"
import asyncHandler from "express-async-handler";
import { uploadcloudinary , deletecloudinary} from "../services/cloudinary.service";
interface RegisterBody {
    title: string
    description: string
    OriginalName: string
    fileName: string
    filePath: string
    mimeType: string
    size: number

}

type FileParams = {
    id:string
}

export const uploadfile = asyncHandler(async (req: Request<{}, {}, RegisterBody>, res: Response) => {

    const { title, description } = req.body;
    const file = req.file;

    if (!title) {
      res.status(400).json({
        success: false,
        message: "Title is Required"
      });
      return;
    }

    if (!file) {
      res.status(400).json({
        success: false,
        message: "File is Required"
      });
      return;
    }


  
    const cloudinaryResult = await uploadcloudinary(
      file.path,
      file.originalname
    );


  
    const uploaded = await prisma.file.create({
      data: {
        title,
        description,

        OriginalName: file.originalname,
        fileName: file.filename,

  
        fileUrl: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
        userId:req.user.id,
        size: file.size,
        mimeType: file.mimetype,
      }
    });


    res.status(201).json({
      success: true,
      message: "File uploaded Successfully",
      uploaded
    });

    return;
  }
);

export const getallfiles = asyncHandler(async (req:Request , res:Response) =>{
         const files = await prisma.file.findMany({
          where:{
            userId:req.user.id
          }
         })

         res.status(200).json({
            success:true,
            message:"Your files",
            count:files.length,
            files,
         })
            })

export  const singlefiles = asyncHandler(async (req:Request<FileParams> , res:Response) =>{
     const {id} = req.params

     if(!id){
        res.status(404).json({
            success: false,
            message: "File is Required"
        })
            return 
     }

       const findfile = await prisma.file.findFirst({
            where:{
                id,
                  userId:req.user.id
            }
       })

         res.status(200).json({
            success: true,
           file:findfile
        })
            return 

})  

export  const deletefiles = asyncHandler(async (req:Request<FileParams> , res:Response) =>{
     const {id} = req.params



      const findfile = await prisma.file.findFirst({
            where:{
                id,
                  userId:req.user.id
            }
       })

       if(!findfile){
         res.status(404).json({
            success: false,
            message:"file not exist"
        })
            return 
       }

       if(!findfile.publicId){
   res.status(400).json({
        success:false,
        message:"Cloudinary id missing"
    });
     return 
}


    await deletecloudinary(findfile.publicId , findfile.mimeType === "application/pdf" ? "raw" : "image");


       const deletefile = await prisma.file.delete({
            where:{
                id,
            }
       })

         res.status(200).json({
            success: true,
            message:"file deleted Successfully"
        })
            return 

}) 

export  const downloadfile = asyncHandler(async (req:Request<FileParams> , res:Response) =>{
     const {id} = req.params



      const findfile = await prisma.file.findFirst({
            where:{
                id,
                  userId:req.user.id
            }
       })

       if(!findfile){
         res.status(404).json({
            success: false,
            message:"file not exist"
        })
            return 
       }


  if(!findfile.fileUrl){
         res.status(404).json({
            success: false,
            message:"file not exist"
        })
            return 
       }




            return  res.redirect(findfile.fileUrl)

    })


