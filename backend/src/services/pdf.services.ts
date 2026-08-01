import { PDFDocument } from "pdf-lib";
import path from "path";
import { pdfname } from "../utils/pdf.util";
import {File} from "@prisma/client"
import fs from "fs"
import { error } from "console";

export const createPdf = async (files:File[],
              outputPath:string
)=>{
    const pdfDoc = await PDFDocument.create();
    for(const file of files){
        const readimg = fs.readFileSync(file.filePath);

          let addedpage;
  const ext = path.extname(file.fileName).toLowerCase();
          if(ext === ".jpg" || ext === ".jpeg"){
            addedpage = await pdfDoc.embedJpg(readimg)
          }
          else if( ext === ".png"){
            addedpage = await pdfDoc.embedPng(readimg)
          }
          else{
            throw new Error("Unsupported Image format")
          }
         addedpage = await pdfDoc.embedJpg(readimg);

        const pages =  pdfDoc.addPage([
            addedpage.width,
            addedpage.height,
        ])

        pages.drawImage(addedpage , {
            x:0,
            y:0,
            width:addedpage.width,
            height:addedpage.height,
        })
    }

    const Savedpdf =  await pdfDoc.save();

    fs.writeFileSync(outputPath,Savedpdf)

}
