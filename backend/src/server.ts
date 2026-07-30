import app from "./app";
const PORT = process.env.PORT || 3000;
import uploadRoute from "./route/file.route"
import sharpRoutes from "./route/sharp.route"
app.use("/api/files" , uploadRoute)
app.use("/api/custom" , sharpRoutes)

app.listen(PORT , ()=>{
      console.log(`Live Backend on ${PORT}`);
})