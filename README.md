# VetSy
VetSy es un programa web para la gestion de veterinarias.
Para usar la base de datos utilicen la siguiente API que ya esta configurada y alojada en un servidor:

Conectarse a la API: https://vetsy-production.up.railway.app

ejemplo se uso con la tabla clientes:

const BASE_URL = "https://vetsy-production.up.railway.app";

// 🔹 CLIENTES

export async function getClientes() {
  const res = await fetch(`${BASE_URL}/clientes`);
  return res.json();
}

export async function crearCliente(cliente) {
  const res = await fetch(`${BASE_URL}/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cliente)
  });
  return res.json();
}

export async function actualizarCliente(id, cliente) {
  const res = await fetch(`${BASE_URL}/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cliente)
  });
  return res.json();
}

export async function eliminarCliente(id) {
  await fetch(`${BASE_URL}/clientes/${id}`, {
    method: "DELETE"
  });
}