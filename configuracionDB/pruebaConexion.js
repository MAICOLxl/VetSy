import { pool } from "./db.js";

async function testDB() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("✅ Conectado:", rows);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

testDB();