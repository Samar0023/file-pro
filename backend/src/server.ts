import app from "./app";
import "./workers/pdf.worker"
const PORT = process.env.PORT || 3000;
import uploadRoute from "./route/file.route"
import sharpRoutes from "./route/sharp.route"
import shareRoutes from "./route/share.route"
import pdfRoutes from "./route/pdf.route"
import authRoutes from "./route/user.route"
import { errorHandler } from "./middleware/error.middleware";


app.use("/api/files" , uploadRoute)
app.use("/api/images" , sharpRoutes)
app.use("/api/pdf" , pdfRoutes)
app.use("/api/share" , shareRoutes)
app.use("/api/auth", authRoutes)

app.use(errorHandler)

app.listen(PORT , ()=>{
      console.log(`Live Backend on ${PORT}`);
})

