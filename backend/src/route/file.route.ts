import { uploadfile , getallfiles , singlefiles  , deletefiles , downloadfile} from "../controllers/fileupload.controller";
import { authmiddleware } from "../middleware/auth.middleware";
import uploads from "../middleware/multer.middleware";
import express from "express"

const router  = express.Router()

router.post("/upload" ,   authmiddleware, uploads.single("file") , uploadfile)
router.get("/allfiles" , authmiddleware, getallfiles)
router.get("/:id" , authmiddleware, singlefiles)
router.post("/delete/:id" , authmiddleware, deletefiles)
router.get("/download/:id" , authmiddleware, downloadfile)
export default router