require("dotenv").config();
const fs = require("fs");
const path = require("path");
const pool = require("./src/config/database.js");

async function initializeDatabase() {
  const client = await pool.connect();
  try {
    console.log("=== Initializing Neon PostgreSQL Schema ===");
    
    // Read cineverseDB.sql from project root
    const sqlPath = path.join(__dirname, "..", "cineverseDB.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    // Execute schema creation
    await client.query(sqlContent);
    console.log("=== Database Tables and Schema Created Successfully! ===");
  } catch (err) {
    if (err.code === "42710" || err.message.includes("already exists")) {
      console.log("Schema already initialized or types already exist.");
    } else {
      console.error("Failed to initialize schema:", err.message);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

initializeDatabase();
