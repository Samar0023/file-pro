import sharp from "sharp"
import path from "path"
 
 
export const resizeImage = async(fileBuffer: Buffer , fileName:string) =>{
        const name = path.parse(fileName).name;
    const processedName = `processed/${Date.now()}-${name}.jpg`;
    await sharp(fileBuffer) 
    .resize({width:200 , height:140}).jpeg({quality:80})
    .toFile(processedName)

    return processedName
}

export const blurImage = async(fileBuffer:Buffer , fileName:string) =>{
       const name = path.parse(fileName).name;
    const processedName = `processed/${Date.now()}-${name}.jpg`;

    await sharp(fileBuffer)
    .blur(6)
    .toFile(processedName)
    return processedName
}

export const rotateImage = async(fileBuffer:Buffer , fileName:string) =>{
       const name = path.parse(fileName).name;
    const processedName = `processed/${Date.now()}-${name}.jpg`;

    await sharp(fileBuffer)
    .rotate(90)
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

export const cropImage = async(fileBuffer:Buffer , fileName:string) =>{
       const name = path.parse(fileName).name;
    const processedName =`processed/${Date.now()}-${name}.jpg`;

    await sharp(fileBuffer)
    .extract({
        left:100,
        top:100,
        width:300,
        height:300,
    })
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

