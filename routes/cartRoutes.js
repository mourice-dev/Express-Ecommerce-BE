import express from "express";
import { addCart, cartCount, getCarts, deleteCarts } from "../controllers/carts.js";  

export const cartRoutes = express.Router();

cartRoutes.post("/add", addCart);
cartRoutes.get("/cart-count", cartCount);
cartRoutes.get("/", getCarts);
cartRoutes.delete("/:itemId",deleteCarts);
    
 