/** @format */

import pool from "./config/db.js";

const createTables = async () => {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
    console.log("Table 'users' created successfully.");

    // Create products table
    // Using 'title' and 'image' to match frontend interface directly
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image TEXT,
        category VARCHAR(50),
        rating DECIMAL(2, 1) DEFAULT 0
      );
    `);
    console.log("Table 'products' created successfully.");

    // Create carts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS carts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER DEFAULT 1
      );
    `);
    console.log("Table 'carts' created successfully.");

    // Seed products if empty
    const countResult = await pool.query("SELECT COUNT(*) FROM products");
    if (parseInt(countResult.rows[0].count) === 0) {
      console.log("Seeding products...");
      const products = [
        {
          title: "Premium Wireless Headphones",
          description: "Immersive sound with active noise cancellation. 30-hour battery life, premium memory foam ear cushions, and crystal-clear microphone for calls.",
          price: 299.99,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
          category: "Electronics",
          rating: 4.8,
        },
        {
          title: "Minimalist Watch",
          description: "Elegant timepiece with a sapphire crystal face, genuine leather strap, and Japanese quartz movement. Water-resistant to 50m.",
          price: 129.5,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
          category: "Accessories",
          rating: 4.5,
        },
        {
          title: "Smart Fitness Tracker",
          description: "Track your health 24/7 with heart rate monitoring, sleep tracking, and GPS. Syncs with your phone for notifications and music control.",
          price: 89.99,
          image:
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
          category: "Electronics",
          rating: 4.2,
        },
        {
          title: "Designer Sunglasses",
          description: "UV400 protection with polarized lenses. Lightweight titanium frame with a timeless aviator design. Includes premium carrying case.",
          price: 159.0,
          image:
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
          category: "Fashion",
          rating: 4.7,
        },
        {
          title: "Leather Crossbody Bag",
          description: "Handcrafted from full-grain Italian leather. Features adjustable strap, multiple compartments, and antique brass hardware.",
          price: 199.99,
          image:
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
          category: "Fashion",
          rating: 4.9,
        },
        {
          title: "Mechanical Keyboard",
          description: "Hot-swappable switches, per-key RGB lighting, and a solid aluminum frame. N-key rollover for precise gaming and fast typing.",
          price: 149.99,
          image:
            "https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=500&q=80",
          category: "Electronics",
          rating: 4.6,
        },
      ];

      for (const product of products) {
        await pool.query(
          "INSERT INTO products (title, description, price, image, category, rating) VALUES ($1, $2, $3, $4, $5, $6)",
          [
            product.title,
            product.description,
            product.price,
            product.image,
            product.category,
            product.rating,
          ]
        );
      }
      console.log("Products seeded successfully.");
    } else {
      console.log("Products table already has data, skipping seed.");
    }
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    pool.end();
  }
};

createTables();
