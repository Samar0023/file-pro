import app from "./app";
const PORT = process.env.PORT || 3000;
import uploadRoute from "./route/file.route"

app.use("/api/files" , uploadRoute)

app.listen(PORT , ()=>{
      console.log(`Live Backend on ${PORT}`);
})