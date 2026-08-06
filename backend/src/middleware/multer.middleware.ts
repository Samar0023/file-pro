import path from "path";
import multer from "multer";


const storage = multer.memoryStorage()



const uploads = multer({
    storage: storage, limits: {
        fileSize: 50 * 1024 * 1024
    }
})

export default uploads