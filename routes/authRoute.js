import { register, login ,getUser } from "../controllers/auth.js";
import express from "express";

export const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/user", getUser);
