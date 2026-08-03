import { PDFDocument , } from "pdf-lib";
import path from "path";
import { getCloudinaryBuffer } from "./cloudinary.service";
import {File} from "@prisma/client"
import fs from "fs"

export const createPdf = async (files:File[])=>{
    const pdfDoc = await PDFDocument.create();
    for(const file of files){
       const Imagebuffer = await getCloudinaryBuffer(file.fileUrl!)

          let addedpage;
  const ext = path.extname(file.fileName).toLowerCase();
          if(ext === ".jpg" || ext === ".jpeg"){
            addedpage = await pdfDoc.embedJpg(Imagebuffer)
          }
          else if( ext === ".png"){
            addedpage = await pdfDoc.embedPng(Imagebuffer)
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

    return Savedpdf

}

export const mergePdf = async (files:File[] ) =>{
  const finalPdf = await PDFDocument.create()

    
     for(const file of files){
      const Imagebuffer = await getCloudinaryBuffer(file.fileUrl!)
    const ext = path.extname(file.fileName).toLowerCase();
      let addedpdf  
       if(ext === ".pdf"){
       addedpdf =  await  PDFDocument.load(Imagebuffer)
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

    return Savednewpdf
}

export const splitPdf = async (files:File ) =>{
 const pdfbuffer = await getCloudinaryBuffer(files.fileUrl!)

  const ext = path.extname(files.fileName).toLowerCase();

          let splitpage;

           if(ext === ".pdf"){
       splitpage =  await  PDFDocument.load(pdfbuffer)
       }
        else{
            throw new Error("Unsupported  format")
          }

          const totalpages = splitpage.getPageCount()

          const splitPdfs:Uint8Array<ArrayBufferLike>[] = []

          for(let i = 0 ; i < totalpages ; i++ ){
            const newpdf = await PDFDocument.create()

            const [page] =  await newpdf.copyPages(splitpage , [i])

             newpdf.addPage(page)

             const Savedpdf =  await newpdf.save();
                 splitPdfs.push(Savedpdf)
          }

          return splitPdfs

          
       

    

        }

          
