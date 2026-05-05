import pool from "./config/db.js";

try {
  console.log("Testing database connection...");
  const r = await pool.query("SELECT current_database(), current_user");
  console.log("✅ Connected:", r.rows[0]);

  const tables = await pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
  );
  console.log("📋 Tables:", tables.rows.map((r) => r.table_name));

  // Check if products table exists and has data
  if (tables.rows.some((r) => r.table_name === "products")) {
    const products = await pool.query("SELECT id, title, image FROM products LIMIT 3");
    console.log("🛍️  Products sample:", JSON.stringify(products.rows, null, 2));
    const count = await pool.query("SELECT COUNT(*) FROM products");
    console.log("🛍️  Total products:", count.rows[0].count);
  } else {
    console.log("⚠️  Products table does NOT exist — run: node initDb.js");
  }

  // Check users table
  if (tables.rows.some((r) => r.table_name === "users")) {
    const count = await pool.query("SELECT COUNT(*) FROM users");
    console.log("👤 Total users:", count.rows[0].count);
  } else {
    console.log("⚠️  Users table does NOT exist — run: node initDb.js");
  }

  await pool.end();
} catch (e) {
  console.error("❌ Error:", e.message);
  process.exit(1);
}
