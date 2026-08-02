import { PDFDocument , } from "pdf-lib";
import path from "path";
import { pdfname } from "../utils/pdf.util";
import {File} from "@prisma/client"
import fs from "fs"

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

export const mergePdf = async (files:File[] , outputPath:string) =>{
  const finalPdf = await PDFDocument.create()

    
     for(const file of files){
      const readpdf = fs.readFileSync(file.filePath)
    const ext = path.extname(file.fileName).toLowerCase();
      let addedpdf  
       if(ext === ".pdf"){
       addedpdf =  await  PDFDocument.load(readpdf)
       }
        else{
            throw new Error("Unsupported  format")
          }

          const addedpage = await finalPdf.copyPages(addedpdf , addedpdf.getPageIndices() )

         addedpage.forEach((addedpage)=>{
           finalPdf.addPage(addedpage);
         })
     } 
     const Savednewpdf = await finalPdf.save()

     fs.writeFileSync(outputPath , Savednewpdf)
}

export const splitPdf = async (files:File , outputPath:string) =>{
  const readpdf = fs.readFileSync(files.filePath)

  const ext = path.extname(files.fileName).toLowerCase();

          let splitpage;

           if(ext === ".pdf"){
       splitpage =  await  PDFDocument.load(readpdf)
       }
        else{
            throw new Error("Unsupported  format")
          }

          const totalpages = splitpage.getPageCount()

          for(let i = 0 ; i < totalpages ; i++ ){
            const newpdf = await PDFDocument.create()

            const [page] =  await newpdf.copyPages(splitpage , [i])

             newpdf.addPage(page)

             const Savedpdf =  await newpdf.save();
                   fs.writeFileSync(outputPath , Savedpdf)
          }

          
       

    

        }

          
