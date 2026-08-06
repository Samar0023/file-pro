import express  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
      origin:"https://file-pro-1.onrender.com",
      credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({
      extended:true
}))

app.use(cookieParser());

app.get("/api/debug-cookie", (req, res) => {
  res.json({
    cookies: req.cookies,
    header: req.headers.cookie ?? null,
  });
});

app.get("/" , (req,res) =>{
      res.json({success:true , message:"app Running on Backend"});
})

export default app;