const API = "http://localhost:3000/api/clientes";

// 📥 Cargar clientes
async function cargarClientes() {
  const res = await fetch(API);
  const data = await res.json();

  const tabla = document.getElementById("tablaClientes");
  tabla.innerHTML = "";

  data.forEach(c => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${c.idCliente}</td>
      <td>${c.nombre}</td>
      <td>${c.telefono}</td>
      <td>${c.email || ""}</td>
      <td>
        <button class="delete" onclick="eliminarCliente(${c.idCliente})">Eliminar</button>
      </td>
    `;

    tabla.appendChild(row);
  });
}

// ➕ Crear cliente
document.getElementById("formCliente").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevoCliente = {
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    email: document.getElementById("email").value,
    direccion: document.getElementById("direccion").value
  };

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevoCliente)
  });

  const data = await res.json();

  if (res.ok) {
    alert("✅ Cliente registrado");
    document.getElementById("formCliente").reset();
    cargarClientes();
  } else {
    alert("❌ Error: " + JSON.stringify(data));
  }
});

// ❌ Eliminar cliente
async function eliminarCliente(id) {
  if (!confirm("¿Eliminar cliente?")) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  cargarClientes();
}

// 🚀 Inicial
cargarClientes();