import {File} from "@prisma/client"
import path from "path"
import cloudinary from "../config/cloudinary"

export const uploadcloudinary  = async(filePath: string , fileName:string) =>{
    const uploadcloudinaryx =   await cloudinary.uploader.upload(
        filePath,
       {
        public_id:fileName
       }
      )

      return uploadcloudinaryx
}

export const deletecloudinary  = async(public_id:string) =>{
    const uploadcloudinaryx =   await cloudinary.uploader.destroy(public_id)

      return uploadcloudinaryx 
}