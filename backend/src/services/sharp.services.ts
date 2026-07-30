import sharp from "sharp"
import path from "path"

export const resizeImage = async(filePath: string , fileName:string) =>{
    const name = path.parse(fileName).name;
    const processedName = `processed/${name}.jpg`
    await sharp(filePath) 
    .resize({width:200 , height:140}).jpeg({quality:80})
    .toFile(processedName)
}