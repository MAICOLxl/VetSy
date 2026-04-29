const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "shuttle.proxy.rlwy.net",
  port: 16747,
  user: "root",
  password: "eDwAYeRgpWqyQVYXltqnMsySnVFNSWaS",
  database: "railway"
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
  } else {
    console.log("Conectado a MySQL 🚀");
  }
});

module.exports = connection;