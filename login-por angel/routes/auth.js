const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM usuario WHERE username = ?", [username], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(401).json({ message: "Usuario no existe" });
    }

    const user = result[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.json({
      message: "Login exitoso",
      user: {
        id: user.idUsuario,
        nombre: user.nombre,
        rol: user.rol
      }
    });
  });
});

module.exports = router;