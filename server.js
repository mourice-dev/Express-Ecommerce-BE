/** @format */
import session from "express-session";
import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import { authRoutes } from "./routes/authRoute.js";
import { productRoutes } from "./routes/productRoute.js";
import { cartRoutes } from "./routes/cartRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`server run on ${PORT}`);
});
// Server running
