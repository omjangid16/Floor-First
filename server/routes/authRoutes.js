import express from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
  forgotPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/signup", register);
router.post("/login", login);
router.post("/signin", login);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.post("/forgot-password", forgotPassword);

export default router;
