import { pool } from "../config/db.js";

export async function crearServicio(data) {
  const { idAnimal, idUsuario, tipoServicio, descripcion, fechaServicio, precio } = data;

  const [result] = await pool.query(
    `INSERT INTO servicio (idAnimal, idUsuario, tipoServicio, descripcion, fechaServicio, precio)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [idAnimal, idUsuario, tipoServicio, descripcion, fechaServicio, precio]
  );

  return result.insertId;
}

export async function obtenerServicios() {
  const [rows] = await pool.query("SELECT * FROM servicio");
  return rows;
}

export async function actualizarServicio(id, data) {
  const { tipoServicio, descripcion, fechaServicio, precio } = data;

  await pool.query(
    `UPDATE servicio
     SET tipoServicio=?, descripcion=?, fechaServicio=?, precio=?
     WHERE idServicio=?`,
    [tipoServicio, descripcion, fechaServicio, precio, id]
  );
}

export async function eliminarServicio(id) {
  await pool.query("DELETE FROM servicio WHERE idServicio=?", [id]);
}