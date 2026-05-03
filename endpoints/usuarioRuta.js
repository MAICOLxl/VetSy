import express from "express";
import {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario
} from "../DAL/usuario.js";

const router = express.Router();

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