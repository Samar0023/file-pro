import { sharefile } from "../controllers/share.controller";

import express from "express"

const router = express.Router()

router.post("share-file" , sharefile)

export default router