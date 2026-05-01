const express = require("express");
const router = express.Router();
const db = require("../db");

// GET
router.get("/", (req, res) => {
  db.query("SELECT * FROM cliente", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST
router.post("/", (req, res) => {
  const { nombre, telefono, email, direccion } = req.body;

  db.query(
    "INSERT INTO cliente (nombre, telefono, email, direccion) VALUES (?, ?, ?, ?)",
    [nombre, telefono, email, direccion],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Cliente creado" });
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM cliente WHERE idCliente = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Cliente eliminado" });
  });
});

module.exports = router;