import pool from "./config/db.js";

// async function insertingn() {
//     const username = "nshuti";
//     const email = "nshutikope@gmail.com";
//     const password = "nshuti123";

//     try {
//         const result = await pool.query(
//             `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`,
//             [username, email, password]
//         );
//     }
//     catch (err) {
//         console.error('Error inserting user:', err);
//     }
// }

// insertingn();
async function fetchUsers() {
    try {
        const result = await pool.query("SELECT * FROM users");
        console.log("Users:", result.rows);
    } catch (err) {
        console.error('Error fetching users:', err);
    }
}

fetchUsers();