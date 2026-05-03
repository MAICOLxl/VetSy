import { pool } from "../configuracionDB/db.js";
//no se actualiza ni elimina
export async function crearDesparasitante(data) {
  const { idAnimal, fechaDesparasitante, proximaFechaDesparasitante, tipoDesparasitante, observacion } = data;

  const [result] = await pool.query(
    `INSERT INTO desparasitantes (idAnimal, fechaDesparasitante, proximaFechaDesparasitante, tipoDesparasitante, observacion)
     VALUES (?, ?, ?, ?, ?)`,
    [idAnimal, fechaDesparasitante, proximaFechaDesparasitante, tipoDesparasitante, observacion]
  );

  return result.insertId;
}

export async function obtenerDesparasitantes() {
  const [rows] = await pool.query("SELECT * FROM desparasitantes");
  return rows;
}