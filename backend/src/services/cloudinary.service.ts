import {File} from "@prisma/client"
import path from "path"
import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary"
import axios from "axios"
import { resolve } from "dns"
import { rejects } from "assert"
import { error } from "console"

export const uploadcloudinary  = async(filePath: string | Buffer | Uint8Array , fileName:string) =>{
     if (typeof filePath === "string") {
    return   await cloudinary.uploader.upload(
        filePath,
       {
        public_id:fileName
       }
      )
    }
      
    return new Promise<UploadApiResponse>((resolve , reject)=>{
        const uploadstream = cloudinary.uploader.upload_stream(
            {
            public_id:fileName,
            resource_type:"auto"
            },
            (error,result)=>{
                if(error){
                    reject(error)
                    return
                }
                if (!result){
                    reject(new Error("Cloudinary upload failed"))
                    return
                }
                resolve (result)
            }

        )
        uploadstream.end(Buffer.from(filePath))
    })

}

export const deletecloudinary  = async(public_id:string , resource_type:string) =>{

    const uploadcloudinaryx =   await cloudinary.uploader.destroy(public_id , {
        resource_type,
    })

      return uploadcloudinaryx 
}

export const getCloudinaryBuffer = async (fileUrl: string)=>{
    const response = await axios.get(fileUrl ,{
        responseType:"arraybuffer"
    })
    return Buffer.from(response.data);
}