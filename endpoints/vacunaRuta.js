import express from "express";
import {
  crearVacuna,
  obtenerVacunas,
  actualizarVacuna,
  eliminarVacuna
} from "../dal/vacuna.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const id = await crearVacuna(req.body);
  res.json({ id });
});

router.get("/", async (req, res) => {
  res.json(await obtenerVacunas());
});

router.put("/:id", async (req, res) => {
  await actualizarVacuna(req.params.id, req.body);
  res.json({ mensaje: "Actualizado" });
});

router.delete("/:id", async (req, res) => {
  await eliminarVacuna(req.params.id);
  res.json({ mensaje: "Eliminado" });
});

export default router;