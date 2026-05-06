import express from "express";
import {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario
} from "../DAL/usuario.js";
import { pool } from "../configuracionDB/db.js";

const router = express.Router();

// ── LOGIN ──────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Usuario y contraseña requeridos." });
    }

    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado." });
    }

    const user = rows[0];

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta." });
    }

    return res.json({
      success: true,
      user: {
        idUsuario: user.idUsuario,
        nombre: user.nombre,
        username: user.username,
        rol: user.rol
      }
    });

  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ success: false, message: "Error interno del servidor." });
  }
});

// ── CRUD ───────────────────────────────────────────────────
router.post("/", async (req, res) => {
  const id = await crearUsuario(req.body);
  res.json({ id });
});

router.get("/", async (req, res) => {
  res.json(await obtenerUsuarios());
});

router.put("/:id", async (req, res) => {
  await actualizarUsuario(req.params.id, req.body);
  res.json({ mensaje: "Actualizado" });
});

router.delete("/:id", async (req, res) => {
  await eliminarUsuario(req.params.id);
  res.json({ mensaje: "Eliminado" });
});

export default router;
