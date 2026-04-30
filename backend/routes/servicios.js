const express = require("express");
const router = express.Router();
const db = require("../db");

// GET
router.get("/", (req, res) => {
  const sql = `
    SELECT servicio.*, animal.nombre AS mascota
    FROM servicio
    JOIN animal ON servicio.idAnimal = animal.idAnimal
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST
router.post("/", (req, res) => {
  const { idAnimal, idUsuario, tipoServicio, descripcion, fechaServicio, precio } = req.body;

  db.query(
    `INSERT INTO servicio (idAnimal, idUsuario, tipoServicio, descripcion, fechaServicio, precio)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [idAnimal, idUsuario, tipoServicio, descripcion, fechaServicio, precio],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Servicio creado" });
    }
  );
});

module.exports = router;