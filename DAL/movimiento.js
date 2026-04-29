import { pool } from "../configuracionDB/db.js";

export async function crearMovimiento(data) {
  const { idProducto, tipoMovimiento, cantidad, fechaMovimiento, referencia } = data;

  const [result] = await pool.query(
    `INSERT INTO movimiento (idProducto, tipoMovimiento, cantidad, fechaMovimiento, referencia)
     VALUES (?, ?, ?, ?, ?)`,
    [idProducto, tipoMovimiento, cantidad, fechaMovimiento, referencia]
  );

  return result.insertId;
}

export async function obtenerMovimientos() {
  const [rows] = await pool.query("SELECT * FROM movimiento");
  return rows;
}