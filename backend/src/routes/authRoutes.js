import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.put("/update-profile",protectRoute,updateProfile);//here we give the protectRoute, because we need to check if they are logged in or authenticated 

router.get("/check", protectRoute,checkAuth);

export default router;