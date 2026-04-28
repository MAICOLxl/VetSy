import { pool } from "../configuracionDB/db.js";

// CREATE
export async function crearCliente(cliente) {
  const { nombre, telefono, email, direccion } = cliente;

  const [result] = await pool.query(
    `INSERT INTO cliente (nombre, telefono, email, direccion)
     VALUES (?, ?, ?, ?)`,
    [nombre, telefono, email, direccion]
  );

  return result.insertId;
}

// READ
export async function obtenerClientes() {
  const [rows] = await pool.query("SELECT * FROM cliente");
  return rows;
}

// UPDATE
export async function actualizarCliente(id, cliente) {
  const { nombre, telefono, email, direccion } = cliente;

  await pool.query(
    `UPDATE cliente
     SET nombre=?, telefono=?, email=?, direccion=?
     WHERE idCliente=?`,
    [nombre, telefono, email, direccion, id]
  );
}

// DELETE
export async function eliminarCliente(id) {
  await pool.query(
    "DELETE FROM cliente WHERE idCliente=?",
    [id]
  );
}