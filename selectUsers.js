/** @format */

import pool from "./config/db.js";

const getUsers = async () => {
  try {
    const res = await pool.query("SELECT * FROM users");
    console.log("Users found:", res.rows.length);
    console.table(res.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
  } finally {
    pool.end();
  }
};

getUsers();
