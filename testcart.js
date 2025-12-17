/** @format */

import pool from "./config/db.js";

async function selects() {
    try {
       const result = await pool.query("SELECT * FROM carts");
        console.log(result.rows);
    }
    catch (err) {
        console.error('Error fetching users:', err);
    }
    
}

selects();
  
