const express = require("express");
const router = express.Router();
const db = require("../db");

// GET
router.get("/", (req, res) => {
  db.query("SELECT * FROM producto", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST
router.post("/", (req, res) => {
  const { nombre, descripcion, categoria, precioCompra, precioVenta, stockActual, stockMinimo } = req.body;

  db.query(
    `INSERT INTO producto (nombre, descripcion, categoria, precioCompra, precioVenta, stockActual, stockMinimo)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, descripcion, categoria, precioCompra, precioVenta, stockActual, stockMinimo],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Producto creado" });
    }
  );
});

module.exports = router;