import express from "express";
import {
  crearServicio,
  obtenerServicios,
  actualizarServicio,
  eliminarServicio
} from "../DAL/servicio.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const id = await crearServicio(req.body);
  res.json({ id });
});

router.get("/", async (req, res) => {
  res.json(await obtenerServicios());
});

router.put("/:id", async (req, res) => {
  await actualizarServicio(req.params.id, req.body);
  res.json({ mensaje: "Actualizado" });
});

router.delete("/:id", async (req, res) => {
  await eliminarServicio(req.params.id);
  res.json({ mensaje: "Eliminado" });
});

export default router;