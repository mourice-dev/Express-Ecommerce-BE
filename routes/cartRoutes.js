import express from "express";
import { addCart } from "../controllers/carts.js";  

export const cartRoutes = express.Router();

cartRoutes.post("/add", addCart);
    
 