import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "shuttle.proxy.rlwy.net",
  user: "root",
  password: "eDwAYeRgpWqyQVYXltqnMsySnVFNSWaS",
  database: "railway",
  port: 16747,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});