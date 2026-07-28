import { uploadfile , getallfiles , singlefiles  , deletefiles , downloadfile} from "../controllers/fileupload.controller";

import uploads from "../middleware/multer.middleware";
import express from "express"

const router  = express.Router()

router.post("/upload" , uploads.single("file") , uploadfile)
router.post("/allfiles" , getallfiles)
router.post("/:id" , singlefiles)
router.post("/delete/:id" , deletefiles)
router.post("/download/:id" , downloadfile)
export default router