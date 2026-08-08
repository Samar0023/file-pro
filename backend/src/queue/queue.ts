import { Queue } from "bullmq";
import { redis } from "../config/redis";


export const pdfQueue = new Queue("pdf-processing", {
    connection: redis
});