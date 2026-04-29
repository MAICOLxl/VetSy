import { pool } from "../configuracionDB/db.js";

//el usuario no se actualiza

// CREATE
export async function crearUsuario(data) {
  const { nombre, username, password, rol, estatusUsuario } = data;

  const [result] = await pool.query(
    `INSERT INTO usuario (nombre, username, password, rol, estatusUsuario, fechaCreacion)
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [nombre, username, password, rol, estatusUsuario]
  );

  return result.insertId;
}

// READ
export async function obtenerUsuarios() {
  const [rows] = await pool.query("SELECT * FROM usuario");
  return rows;
}

// UPDATE
export async function actualizarUsuario(id, data) {
  const { nombre, username, password, rol, estatusUsuario } = data;

  await pool.query(
    `UPDATE usuario
     SET nombre=?, username=?, password=?, rol=?, estatusUsuario=?
     WHERE idUsuario=?`,
    [nombre, username, password, rol, estatusUsuario, id]
  );
}

// DELETE
export async function eliminarUsuario(id) {
  await pool.query("DELETE FROM usuario WHERE idUsuario=?", [id]);
}