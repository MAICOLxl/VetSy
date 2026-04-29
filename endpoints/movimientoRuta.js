import express from "express";
import {
  crearMovimiento,
  obtenerMovimientos
} from "../dal/movimiento.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const id = await crearMovimiento(req.body);
  res.json({ id });
});

router.get("/", async (req, res) => {
  res.json(await obtenerMovimientos());
});

export default router;