import pool from '../config/db.js';

export async function addCart(req, res) {
  const userId = req.session.userId;
  
  const productId = parseInt(req.body.productId);

  // 2. Add return to stop execution if invalid
  if (!userId) {
    return res.status(401).json({ message: "user is not logged in " });
  }

  if (!productId || isNaN(productId)) {
    return res.status(400).json({ message: "this is not number!" });
  }

  try {
    // 3. Check 'carts' table, not 'users' table
    const select = await pool.query(
      "SELECT * FROM carts WHERE user_id = $1 AND product_id = $2", 
      [userId, productId]
    );

    // 4. Check rows.length to see if it exists
    if (select.rows.length === 0) {
      await pool.query(
        "INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, 1)", 
        [userId, productId]
      );
      return res.json({ message: "cart added!" });
    } else {
      // 5. Update existing item using its ID
      const cartId = select.rows[0].id;
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