import express from "express";
import {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto
} from "../DAL/producto.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const id = await crearProducto(req.body);
  res.json({ id });
});

router.get("/", async (req, res) => {
  res.json(await obtenerProductos());
});

router.put("/:id", async (req, res) => {
  await actualizarProducto(req.params.id, req.body);
  res.json({ mensaje: "Actualizado" });
});

router.delete("/:id", async (req, res) => {
  await eliminarProducto(req.params.id);
  res.json({ mensaje: "Eliminado" });
});

export default router;