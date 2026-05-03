import express from "express";
import {
  aplicarVacuna,
  obtenerVacunasAplicadas
} from "../DAL/aplicacionVacuna.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const id = await aplicarVacuna(req.body);
  res.json({ id });
});

router.get("/", async (req, res) => {
  res.json(await obtenerVacunasAplicadas());
});

export default router;