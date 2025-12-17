/** @format */

import pool from "../config/db.js";
import validator from "validator";

export async function login(req, res) {
  
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "input required please!", error: "Missing fields" });
  }
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length === 0) {
      console.log("User not found");
      return res
        .status(400)
        .json({ message: "username not found!", error: "User not found" });
    }

    const user = result.rows[0];
    // Note: In a real app, use bcrypt to compare hashed passwords
    if (user.password !== password) {
      console.log("Invalid password - sending response");
      return res
        .status(401)
        .json({ message: "Invalid password!", error: "Invalid credentials" });
    }
    req.session.userId = user.id;
    console.log("Login successful");
    res.status(200).json({
      message: "login sucessful",
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function register(req, res) {
  const { name, email, password } = req.body;
  const username = name;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "input required please!" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "this is not email!" });
  }

  try {
    console.log("Attempting to register user:", { username, email });
    const result = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`,
      [username, email, password]
    );

    if (result.rows.length > 0) {
      console.log("User inserted with ID:", result.rows[0].id);
      res.status(201).json({ message: "register sucessful" });
    }
  } catch (err) {
    console.error("Registration error details:", err);
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }
    res.status(500).json({ message: "insert failed!", error: err.message });
  }
}

export async function getUser(req, res) {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.session.userId,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = result.rows[0];
    res.json({ username: user.username, email: user.email, id: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.json({ message: "Logout successful" });
  });
}
