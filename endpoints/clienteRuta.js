import express from "express";
import {
  crearCliente,
  obtenerClientes,
  actualizarCliente,
  eliminarCliente
} from "../DAL/cliente.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const id = await crearCliente(req.body);
  res.json({ id });
});

router.get("/", async (req, res) => {
  res.json(await obtenerClientes());
});

router.put("/:id", async (req, res) => {
  await actualizarCliente(req.params.id, req.body);
  res.json({ mensaje: "Actualizado" });
});

router.delete("/:id", async (req, res) => {
  await eliminarCliente(req.params.id);
  res.json({ mensaje: "Eliminado" });
});

export default router;