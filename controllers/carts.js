/** @format */

import pool from "../config/db.js";

export async function addCart(req, res) {
  const userId = req.session.userId;

  const productId = parseInt(req.body.productId);


  if (!userId) {
    return res.status(401).json({ message: "user is not logged in " });
  }

  if (!productId || isNaN(productId)) {
    return res.status(400).json({ message: "this is not number!" });
  }

  try {
 
    const existing = await pool.query(
      "SELECT * FROM carts WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );

 
    if (existing.rows.length === 0) {
      await pool.query(
        "INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, 1)",
        [userId, productId]
      );
      return res.json({ message: "cart added!" });
    } else {
      const cartId = existing.rows[0].id; 
      await pool.query(
        "UPDATE carts SET quantity = quantity + 1 WHERE id = $1",
        [cartId]
      );
      return res.json({ message: "cart updated!" });
    }
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ message: "Server error" });
  }
}
export async function cartCount(req, res) {
  const userId = req.session.userId;

  if (!userId) {
    return res.json({ message: "user not logged in" });
  }

  try {
    const select = await pool.query(
      "SELECT SUM(quantity) FROM carts WHERE user_id = $1",
      [userId]
    );
    const count = parseInt(select.rows[0].sum);
    res.json({ count: count || 0 });
    
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ message: "Server error" });
  }
}


export async function getCarts(req, res) {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "user is not logged in" });
  }

  try {
    const items = await pool.query(
      `SELECT carts.id, carts.quantity, products.title, products.price, products.image 
       FROM carts 
       JOIN products ON carts.product_id = products.id 
       WHERE carts.user_id = $1`,
      [userId]
    );
   
    res.status(200).json(items.rows);
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function deleteCarts(req, res) {
  const itemId = req.params.itemId;
  const userId = req.session.userId;
 
  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (!itemId) {
    return res.status(400).json({ message: "No item ID provided" });
  }

  try {
 
    await pool.query("DELETE FROM carts WHERE id = $1 AND user_id = $2", [itemId, userId]);
    res.status(200).json({ message: "Item removed from cart" });
    
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ message: "Server error" });
  }
}