import { resizeImagex , blurImagex , compositeImagex , cropImagex , rotateImagex , grayscaleImagex} from "../controllers/sharp.controller";
import express from "express"
import { authmiddleware } from "../middleware/auth.middleware";
const router = express.Router()

router.post("/resize/:id" , authmiddleware, resizeImagex);
router.post("/blur/:id" , authmiddleware, blurImagex);
router.post("/watermark/:id/:oid" , authmiddleware,compositeImagex)
router.post("/crop/:id" ,authmiddleware, cropImagex);
router.post("/rotate/:id" , authmiddleware, rotateImagex);
router.post("/grayscale/:id" , authmiddleware, grayscaleImagex);
export default router;

