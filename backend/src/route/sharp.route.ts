import { resizeImagex } from "../controllers/sharp.controller";
import express from "express"

const router = express.Router()

router.post("/resizeImage/:id" , resizeImagex);

export default router;

