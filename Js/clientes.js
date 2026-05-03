const BASE_URL = "https://vetsy-production.up.railway.app";

/* =========================
   🔹 OBTENER CLIENTES (Y RENDER EN TABLA)
========================= */
async function obtenerClientes() {
  try {
    const res = await fetch(`${BASE_URL}/clientes`);
    const data = await res.json();

    const tabla = document.getElementById("tablaClientes");

    tabla.innerHTML = data.map(cliente => `
      <tr>
        <td>${cliente.id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.email || ""}</td>
        <td>
          <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
        </td>
      </tr>
    `).join("");

  } catch (error) {
    console.error("Error al obtener clientes:", error);
  }
}

/* =========================
   🔹 CREAR CLIENTE
========================= */
async function crearCliente() {
  const cliente = {
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    email: document.getElementById("email").value,
    direccion: document.getElementById("direccion").value
  };

  try {
    await fetch(`${BASE_URL}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    });

    alert("Cliente creado ✅");
    obtenerClientes();

  } catch (error) {
    console.error("Error al crear cliente:", error);
  }
}

/* =========================
   🔹 ACTUALIZAR CLIENTE
========================= */
async function actualizarCliente() {
  const id = document.getElementById("idActualizar").value;

  const cliente = {
    nombre: document.getElementById("nombreUpd").value,
    telefono: document.getElementById("telefonoUpd").value,
    email: document.getElementById("emailUpd").value,
    direccion: document.getElementById("direccionUpd").value
  };

  try {
    await fetch(`${BASE_URL}/clientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    });

    alert("Cliente actualizado 🔄");
    obtenerClientes();

  } catch (error) {
    console.error("Error al actualizar cliente:", error);
  }
}

/* =========================
   🔹 ELIMINAR CLIENTE
========================= */
async function eliminarCliente(id) {
  try {
    await fetch(`${BASE_URL}/clientes/${id}`, {
      method: "DELETE"
    });

    alert("Cliente eliminado ❌");
    obtenerClientes();

  } catch (error) {
    console.error("Error al eliminar cliente:", error);
  }
}

/* =========================
   🔹 AUTO CARGAR LISTA
========================= */
document.addEventListener("DOMContentLoaded", () => {
  obtenerClientes();
});