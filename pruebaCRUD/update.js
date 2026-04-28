import { actualizarCliente } from "../DAL/cliente.js";

async function testUpdate() {
  try {
    const id = 1; // ⚠️ cambia este ID por uno que exista

    const resultado = await actualizarCliente(id, {
      nombre: "Ana Actualizada",
      telefono: "8099999999",
      email: "ana_update@test.com",
      direccion: "Santo Domingo Centro"
    });

    console.log("🔄 Filas afectadas:", resultado);

  } catch (error) {
    console.error("❌ Error UPDATE:", error.message);
  }
}

testUpdate();