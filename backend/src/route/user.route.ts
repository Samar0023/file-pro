import { signup , login , logout } from "../controllers/user.auth";
import { authmiddleware } from "../middleware/auth.middleware";
import express from "express"

const router = express.Router()

router.post("/signup" , signup);
router.post("/login" , login);
router.post("/logout", logout);
router.get("/profile", authmiddleware , (req,res) => {
    res.json(req.user);
});

export default router