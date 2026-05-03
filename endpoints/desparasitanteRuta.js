import express from "express";
import {
  crearDesparasitante,
  obtenerDesparasitantes
} from "../DAL/desparasitante.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const id = await crearDesparasitante(req.body);
  res.json({ id });
});

router.get("/", async (req, res) => {
  res.json(await obtenerDesparasitantes());
});

export default router;