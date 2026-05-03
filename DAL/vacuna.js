import { pool } from "../configuracionDB/db.js";

export async function crearVacuna(data) {
  const { nombre, descripcion } = data;

  const [result] = await pool.query(
    `INSERT INTO vacuna (nombre, descripcion)
     VALUES (?, ?)`,
    [nombre, descripcion]
  );

  return result.insertId;
}

export async function obtenerVacunas() {
  const [rows] = await pool.query("SELECT * FROM vacuna");
  return rows;
}

export async function actualizarVacuna(id, data) {
  const { nombre, descripcion } = data;

  await pool.query(
    `UPDATE vacuna
     SET nombre=?, descripcion=?
     WHERE idVacuna=?`,
    [nombre, descripcion, id]
  );
}

export async function eliminarVacuna(id) {
  await pool.query("DELETE FROM vacuna WHERE idVacuna=?", [id]);
}