import { resizeImagex , blurImagex , compositeImagex , cropImagex , rotateImagex , grayscaleImagex} from "../controllers/sharp.controller";
import express from "express"

const router = express.Router()

router.post("/resizeImage/:id" , resizeImagex);
router.post("/blurImage/:id" , blurImagex);
router.post("/watermark/:id/:oid" , compositeImagex)
router.post("/cropImage/:id" , cropImagex);
router.post("/rotateImage/:id" , rotateImagex);
router.post("/grayscaleImage/:id" , grayscaleImagex);
export default router;

