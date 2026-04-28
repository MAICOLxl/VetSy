import { obtenerClientes } from "../DAL/cliente.js";

async function testDB() {
  try {
    const clientes = await obtenerClientes();
    console.log("📦 Datos:", clientes);
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

testDB();