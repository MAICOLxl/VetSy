import { pool } from "../configuracionDB/db.js";

export async function aplicarVacuna(data) {
  const { idAnimal, idVacuna, fechaVacuna, fechaProximaVacuna } = data;

  const [result] = await pool.query(
    `INSERT INTO aplicacionvacuna (idAnimal, idVacuna, fechaVacuna, fechaProximaVacuna)
     VALUES (?, ?, ?, ?)`,
    [idAnimal, idVacuna, fechaVacuna, fechaProximaVacuna]
  );

  return result.insertId;
}

export async function obtenerVacunasAplicadas() {
  const [rows] = await pool.query("SELECT * FROM aplicacionvacuna");
  return rows;
}