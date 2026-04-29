const db = require("../config/db");

exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM usuario WHERE username = ? AND password = ? AND estatusUsuario = 'A'";

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length > 0) {
      return res.json({
        success: true,
        user: results[0]
      });
    } else {
      return res.json({
        success: false,
        message: "Usuario o contraseña incorrectos"
      });
    }
  });
};