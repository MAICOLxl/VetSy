import express from "express";
import {
  crearHistorial,
  obtenerHistorial
} from "../DAL/historial.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const id = await crearHistorial(req.body);
  res.json({ id });
});

router.get("/", async (req, res) => {
  res.json(await obtenerHistorial());
});

export default router;