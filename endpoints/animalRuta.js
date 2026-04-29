import express from "express";
import {
  crearAnimal,
  obtenerAnimales,
  actualizarAnimal,
  eliminarAnimal
} from "../dal/animal.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const id = await crearAnimal(req.body);
  res.json({ id });
});

router.get("/", async (req, res) => {
  res.json(await obtenerAnimales());
});

router.put("/:id", async (req, res) => {
  await actualizarAnimal(req.params.id, req.body);
  res.json({ mensaje: "Actualizado" });
});

router.delete("/:id", async (req, res) => {
  await eliminarAnimal(req.params.id);
  res.json({ mensaje: "Eliminado" });
});

export default router;