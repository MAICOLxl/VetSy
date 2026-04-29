const db = require("./config/db");

db.query("SELECT 1", (err, results) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Conexión funcionando:", results);
  }
});