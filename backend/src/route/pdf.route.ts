import { createPdfx } from "../controllers/pdf.controller"
import express, { Router } from "express"

const router = express.Router()

router.post("/create-pdf" , createPdfx);

export default router