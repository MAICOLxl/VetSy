const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "shuttle.proxy.rlwy.net",
  port: 16747,
  user: "root",
  password: "eDwAYeRgpWqyQVYXltqnMsySnVFNSWaS",
  database: "railway"
});

db.connect(err => {
  if (err) {
    console.error("❌ Error DB:", err);
  } else {
    console.log("✅ MySQL conectado");
  }
});

module.exports = db;