import { pool } from "../configuracionDB/db.js";

export async function crearHistorial(data) {
  const { idAnimal, fechaHistorial, observacion } = data;

  const [result] = await pool.query(
    `INSERT INTO historial (idAnimal, fechaHistorial, observacion)
     VALUES (?, ?, ?)`,
    [idAnimal, fechaHistorial, observacion]
  );

  return result.insertId;
}

export async function obtenerHistorial() {
  const [rows] = await pool.query("SELECT * FROM historial");
  return rows;
}