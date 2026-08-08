import { Worker } from "bullmq";
import {redis} from "../config/redis"
import { mergePdf , createPdf , splitPdf } from "../services/pdf.services";
import {prisma} from "../config/prisma"
import { uploadcloudinary } from "../services/cloudinary.service";
import { pdfname } from "../utils/pdf.util";



const worker = new Worker(

    "pdf-processing",

    async(job)=>{
        const {filesId,userId , fileId ,dbJobId} = job.data


         await prisma.processingJob.update({
            where:{
                id:dbJobId
            },
            data:{
                status:"PROCESSING"
            }
        })


        



         let pdfbuffer: Buffer | Uint8Array |  undefined ; 


         if(job.name === "merge-pdf"){
        const files = await prisma.file.findMany({
              where:{
                id:{
                    in:filesId
                    
                },
                userId
                
              }
        })

   if(files.length === 0){
            throw new Error("files not found")
        }

         pdfbuffer = await mergePdf(files);
    }

   else if(job.name === "split-pdf"){
        const file = await prisma.file.findFirst({
              where:{
          
                    id:fileId,
                    
                
                userId
                
              }
        })

        if(!file){
            throw new Error("no file found")
        }

       const splitbuffer = await splitPdf(file);

          for(const buffer of splitbuffer){

        const cloudinaryResult = await uploadcloudinary(
            buffer,
            `split-${Date.now()}.pdf`
        );

          await prisma.file.create({
                    data:{
                        title:"Split PDF",
                        description:"Split PDF page",
                        OriginalName:"split.pdf",
                        fileName:"split.pdf",
                        fileUrl:cloudinaryResult.secure_url,
                        publicId:cloudinaryResult.public_id,
                        size:buffer.length,
                        mimeType:"application/pdf",
                        userId
                    }
                });

    }
    await prisma.processingJob.update({
                where:{
                    id:dbJobId
                },
                data:{
                    status:"COMPLETED"
                }
            });


            return {
                success:true
            };
    }

  else   if(job.name === "create-pdf"){
        const files = await prisma.file.findMany({
              where:{
                id:{
                    in:filesId
                    
                },
                userId
                
              }
        })

        if(files.length === 0){
            throw new Error("files not found")
        }

         pdfbuffer = await createPdf(files);
    }



    if (!pdfbuffer) {
    throw new Error("PDF buffer not generated");
}
        
       
        
        
            const cloudinaryResult = await uploadcloudinary(
                pdfbuffer,
                pdfname
            )
        
            const processedFile = await prisma.file.create({
                data: {
                    title: `${job.name} done`,
                    description: `${job.name} work done`,
                    OriginalName: pdfname,
                    fileName: pdfname,
                    fileUrl: cloudinaryResult.secure_url,
                    userId,
                    publicId: cloudinaryResult.public_id,
                    size: pdfbuffer.length,
                    mimeType: "application/pdf"
                }
            })

            await prisma.processingJob.update({
                 where:{
                id:dbJobId
            },
            data:{
                status:"COMPLETED",
                resultFileId:processedFile.id
            }
            })


            return {
                success:true,
            }

           
            },

            {
            
            connection:redis
            }
        )
             worker.on("completed" , (job)=>{
                console.log(
                    `Job ${job.id} completed`
                )
            })

            worker.on("failed" , (job, error)=>{
                console.log(
        "Job failed",
        error.message
    )
    }
)
