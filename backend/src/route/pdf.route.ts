import { createPdfx , mergePdfx , splitPdfx } from "../controllers/pdf.controller"
import express from "express"

const router = express.Router()

router.post("/create-pdf" , createPdfx);
router.post("/merge-pdf" , mergePdfx);
router.post("/split-pdf" , splitPdfx)

export default router