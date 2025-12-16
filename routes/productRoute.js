/** @format */

import { products } from "../controllers/product.js";
import express from "express";

export const productRoutes = express.Router();

productRoutes.get("/", products);
