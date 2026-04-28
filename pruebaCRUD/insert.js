import { crearCliente } from "../DAL/cliente.js";

async function testInsert() {
  try {
    const id = await crearCliente({
      nombre: "Ana",
      telefono: "8090000000",
      email: "ana@test.com",
      direccion: "Zona Colonial"
    });

    console.log("✅ Insertado ID:", id);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

testInsert();