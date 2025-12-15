import pool from "../config/db.js"
import validator from 'validator'

export async function login(req,res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'input required please!' });
    }
    try {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'username not found!' });
        }
        res.status(200).json({ message: 'login sucessful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function register(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "input required please!" });
  }
  if (!validator.isEmail(email)) {
       return res.status(400).json({ message: "this is not email!" });
  }
    
  try {
      await pool.query("INSERT INTO users (username,email,password) VALUES ($1, $2, $3)", [
        username,email,password
      ]);
      res.status(201).json({ message: "register sucessful" });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "insert failed!" });
  }
}