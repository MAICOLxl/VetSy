import express from "express";
import {
  crearProveedor,
  obtenerProveedores,
  actualizarProveedor,
  eliminarProveedor
} from "../DAL/proveedor.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const id = await crearProveedor(req.body);
  res.json({ id });
});

router.get("/", async (req, res) => {
  res.json(await obtenerProveedores());
});

router.put("/:id", async (req, res) => {
  await actualizarProveedor(req.params.id, req.body);
  res.json({ mensaje: "Actualizado" });
});

router.delete("/:id", async (req, res) => {
  await eliminarProveedor(req.params.id);
  res.json({ mensaje: "Eliminado" });
});

export default router;