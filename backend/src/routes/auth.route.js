// @ts-nocheck
import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  login,
  logout,
  signup,
  updateProfil,
  checkAuth,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profil", protectedRoute, updateProfil);

router.get("/check", protectedRoute, checkAuth);

export default router;
