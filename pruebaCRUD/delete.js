import { eliminarCliente } from "../DAL/cliente.js";

async function testDelete() {
  try {
    const id = 1; // ⚠️ cambia este ID por uno que exista

    const resultado = await eliminarCliente(id);

    console.log("🗑️ Filas eliminadas:", resultado);

  } catch (error) {
    console.error("❌ Error DELETE:", error.message);
  }
}

testDelete();