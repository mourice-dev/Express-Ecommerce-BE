/** @format */

import { register, login, getUser, logout } from "../controllers/auth.js";
import express from "express";

export const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login",login);
authRoutes.get("/user", getUser);
authRoutes.delete("/logout", logout);
