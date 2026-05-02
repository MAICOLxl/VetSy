const express = require("express");
const router = express.Router();
const db = require("../db");

// GET
router.get("/", (req, res) => {
  const sql = `
    SELECT animal.*, cliente.nombre AS dueño
    FROM animal
    JOIN cliente ON animal.idCliente = cliente.idCliente
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST
router.post("/", (req, res) => {
  const { idCliente, nombre, fechaNacimiento, raza, genero } = req.body;

  db.query(
    "INSERT INTO animal (idCliente, nombre, fechaNacimiento, raza, genero) VALUES (?, ?, ?, ?, ?)",
    [idCliente, nombre, fechaNacimiento, raza, genero],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Animal creado" });
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM animal WHERE idAnimal = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Animal eliminado" });
  });
});

module.exports = router;