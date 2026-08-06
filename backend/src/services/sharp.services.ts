import sharp from "sharp"
import path from "path"
 
 
export const resizeImage = async(fileBuffer: Buffer , fileName:string , height:number , width:number) =>{
        const name = path.parse(fileName).name;
    const processedName = `processed/${Date.now()}-${name}.jpg`;
    await sharp(fileBuffer) 
    .resize(width, height).jpeg({quality:80})
    .toFile(processedName)

    return processedName;
}

export const blurImage = async(fileBuffer:Buffer , fileName:string) =>{
       const name = path.parse(fileName).name;
    const processedName = `processed/${Date.now()}-${name}.jpg`;

    await sharp(fileBuffer)
    .blur(6)
    .toFile(processedName)
    return processedName
}

export const rotateImage = async(fileBuffer:Buffer , fileName:string , rotation:number) =>{
       const name = path.parse(fileName).name;
    const processedName = `processed/${Date.now()}-${name}.jpg`;

    await sharp(fileBuffer)
    .rotate(rotation)
    .toFile(processedName)
    return processedName
}

export const grayscaleImage = async(fileBuffer:Buffer, fileName:string) =>{
       const name = path.parse(fileName).name;
    const processedName = `processed/${Date.now()}-${name}.jpg`;

    await sharp(fileBuffer)
    .grayscale()
    .toFile(processedName)
    return processedName
}

export const cropImage = async(fileBuffer:Buffer , fileName:string , width:number , height:number , left:number , top:number ) =>{
       const name = path.parse(fileName).name;
    const processedName =`processed/${Date.now()}-${name}.jpg`;
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
    await sharp(fileBuffer)
    .extract({width , height , left , top})
    .toFile(processedName)
    return processedName
}

export const compositeImage = async(fileBuffer:Buffer, fileName:string , fileBufferimg:Buffer ) =>{
       const name = path.parse(fileName).name;
    const processedName = `processed/${Date.now()}-${name}.jpg`;

    await sharp(fileBuffer)
    .composite([{
         input:fileBufferimg,
         gravity:"southeast",
}])
    .toFile(processedName)
    return processedName
}

