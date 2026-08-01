import sharp from "sharp"
import path from "path"
 
 
export const resizeImage = async(filePath: string , fileName:string) =>{
        const name = path.parse(fileName).name;
    const processedName = `processed/${name}.jpg`
    await sharp(filePath) 
    .resize({width:200 , height:140}).jpeg({quality:80})
    .toFile(processedName)
}

export const blurImage = async(filePath: string , fileName:string) =>{
       const name = path.parse(fileName).name;
    const processedName = `processed/${name}.jpg`

    await sharp(filePath)
    .blur(6)
    .toFile(processedName)
}

export const rotateImage = async(filePath: string , fileName:string) =>{
       const name = path.parse(fileName).name;
    const processedName = `processed/${name}.jpg`

    await sharp(filePath)
    .rotate(90)
    .toFile(processedName)
}

export const grayscaleImage = async(filePath: string , fileName:string) =>{
       const name = path.parse(fileName).name;
    const processedName = `processed/${name}.jpg`

    await sharp(filePath)
    .grayscale()
    .toFile(processedName)
}

export const cropImage = async(filePath: string , fileName:string) =>{
       const name = path.parse(fileName).name;
    const processedName = `processed/${name}.jpg`

    await sharp(filePath)
    .extract({
        left:100,
        top:100,
        width:300,
        height:300,
    })
    .toFile(processedName)
}

export const compositeImage = async(filePath: string , fileName:string , overlayimagePath:string  ) =>{
       const name = path.parse(fileName).name;
    const processedName = `processed/${name}.jpg`

    await sharp(filePath)
    .composite([{
         input:overlayimagePath,
         gravity:"southeast",
}])
    .toFile(processedName)
}

