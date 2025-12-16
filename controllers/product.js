import pool from "../config/db.js";

export async function products(req, res) {
    try {
        const selects = await pool.query("SELECT * FROM products");
        if (selects.rows.length === 0) {
            console.log("No products found");
            return res.status(404).json({ message: "No products found" });
        }
        const select = selects.rows;
        console.log("Products retrieved successfully");
        res.status(200).json(select);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
}