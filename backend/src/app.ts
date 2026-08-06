import express  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
      origin:"https://file-pro.onrender.com",
      credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({
      extended:true
}))

app.use(cookieParser());

app.get("/" , (req,res) =>{
      res.json({success:true , message:"app Running on Backend"});
})

export default app;