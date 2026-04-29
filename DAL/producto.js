import { pool } from "../configuracionDB/db.js";

export async function crearProducto(data) {
  const { nombre, descripcion, categoria, precioCompra, precioVenta, stockActual, stockMinimo } = data;

  const [result] = await pool.query(
    `INSERT INTO producto (nombre, descripcion, categoria, precioCompra, precioVenta, stockActual, stockMinimo)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, descripcion, categoria, precioCompra, precioVenta, stockActual, stockMinimo]
  );

  return result.insertId;
}

export async function obtenerProductos() {
  const [rows] = await pool.query("SELECT * FROM producto");
  return rows;
}

export async function actualizarProducto(id, data) {
  const { nombre, descripcion, categoria, precioCompra, precioVenta, stockActual, stockMinimo } = data;

  await pool.query(
    `UPDATE producto
     SET nombre=?, descripcion=?, categoria=?, precioCompra=?, precioVenta=?, stockActual=?, stockMinimo=?
     WHERE idProducto=?`,
    [nombre, descripcion, categoria, precioCompra, precioVenta, stockActual, stockMinimo, id]
  );
}

export async function eliminarProducto(id) {
  await pool.query("DELETE FROM producto WHERE idProducto=?", [id]);
}