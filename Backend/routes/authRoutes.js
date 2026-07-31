import express from "express";
import {
  registerUser,
  loginUser,
  verifyOTP,
  completeProfile,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from "../controllers/authController.js";
import { authenticateToken ,authorizeRole } from "../middleware/addMiddleware.js";

const authrouter = express.Router();

authrouter.post("/register", registerUser);
authrouter.post("/login", loginUser);
authrouter.post("/verify-otp", verifyOTP);
authrouter.post("/complete-profile", completeProfile);

//protected route
authrouter.get("/me", authenticateToken, getUserProfile);
authrouter.put("/update-profile", authenticateToken, updateUserProfile);

authrouter.get(
  "/users",
  authenticateToken,
  authorizeRole("admin"),
  getAllUsers,
);

export default authrouter;
