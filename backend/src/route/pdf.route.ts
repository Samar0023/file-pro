import { createPdfx , mergePdfx , splitPdfx } from "../controllers/pdf.controller"
import { authmiddleware } from "../middleware/auth.middleware";
import express from "express"

const router = express.Router()

router.post("/create-pdf" , authmiddleware, createPdfx);
router.post("/merge-pdf" , authmiddleware, mergePdfx);
router.post("/split-pdf/:id" , authmiddleware, splitPdfx)

export default router