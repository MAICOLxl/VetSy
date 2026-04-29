import { pool } from "../configuracionDB/db.js";

export async function crearProveedor(data) {
  const { nombre, telefono, extensionTelefono, email } = data;

  const [result] = await pool.query(
    `INSERT INTO proveedor (nombre, telefono, extensionTelefono, email)
     VALUES (?, ?, ?, ?)`,
    [nombre, telefono, extensionTelefono, email]
  );

  return result.insertId;
}

export async function obtenerProveedores() {
  const [rows] = await pool.query("SELECT * FROM proveedor");
  return rows;
}

export async function actualizarProveedor(id, data) {
  const { nombre, telefono, extensionTelefono, email } = data;

  await pool.query(
    `UPDATE proveedor
     SET nombre=?, telefono=?, extensionTelefono=?, email=?
     WHERE idProveedor=?`,
    [nombre, telefono, extensionTelefono, email, id]
  );
}

export async function eliminarProveedor(id) {
  await pool.query("DELETE FROM proveedor WHERE idProveedor=?", [id]);
}