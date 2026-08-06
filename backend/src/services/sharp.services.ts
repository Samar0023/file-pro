import sharp from "sharp"
import path from "path"
 
 
export const resizeImage = async(fileBuffer: Buffer , fileName:string , height:number , width:number) =>{
   
  const processedBuffer = await sharp(fileBuffer) 
    .resize(width, height).jpeg({quality:80})
    .toBuffer()

    return processedBuffer;
}

export const blurImage = async(fileBuffer:Buffer , fileName:string) =>{
      

  const processedBuffer =  await sharp(fileBuffer)
    .blur()
    .toBuffer()
    return processedBuffer
}

export const rotateImage = async(fileBuffer:Buffer , fileName:string , rotation:number) =>{
      

 const processedBuffer  = await sharp(fileBuffer)
    .rotate(rotation)
    .toBuffer()
    return processedBuffer
}

export const grayscaleImage = async(fileBuffer:Buffer, fileName:string) =>{
       

  const processedBuffer =   await sharp(fileBuffer)
    .grayscale()
    .toBuffer()
    return processedBuffer
}

export const cropImage = async(fileBuffer:Buffer , fileName:string , width:number , height:number , left:number , top:number ) =>{
    
    const metadata = await sharp(fileBuffer).metadata()
    
    if(!metadata.width || !metadata.height){
        throw new Error("Unable to read Image Dimensions")
    }
      if (
    left < 0 ||
    top < 0 ||
    width <= 0 ||
    height <= 0 ||
    left + width > metadata.width ||
    top + height > metadata.height
  ) {
    throw new Error("Crop area exceeds image boundaries.");
  }
   const processedBuffer =  await sharp(fileBuffer)
    .extract({width , height , left , top})
    .toBuffer()
    return processedBuffer
}

export const compositeImage = async(fileBuffer:Buffer, fileName:string , fileBufferimg:Buffer ) =>{
      

  const processedBuffer =   await sharp(fileBuffer)
    .composite([{
         input:fileBufferimg,
         gravity:"southeast",
}])
    .toBuffer()
    return processedBuffer
    
}

