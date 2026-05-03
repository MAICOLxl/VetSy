import { pool } from "../configuracionDB/db.js";

// CREATE
export async function crearAnimal(data) {
  const { idCliente, nombre, fechaNacimiento, raza, genero } = data;

  const [result] = await pool.query(
    `INSERT INTO animal (idCliente, nombre, fechaNacimiento, raza, genero)
     VALUES (?, ?, ?, ?, ?)`,
    [idCliente, nombre, fechaNacimiento, raza, genero]
  );

  return result.insertId;
}

// READ
export async function obtenerAnimales() {
  const [rows] = await pool.query("SELECT * FROM animal");
  return rows;
}

// UPDATE
export async function actualizarAnimal(id, data) {
  const { nombre, fechaNacimiento, raza, genero } = data;

  await pool.query(
    `UPDATE animal
     SET nombre=?, fechaNacimiento=?, raza=?, genero=?
     WHERE idAnimal=?`,
    [nombre, fechaNacimiento, raza, genero, id]
  );
}

// DELETE
export async function eliminarAnimal(id) {
  await pool.query("DELETE FROM animal WHERE idAnimal=?", [id]);
}