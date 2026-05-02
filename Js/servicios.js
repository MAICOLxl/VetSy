const API = "http://localhost:3000/api/servicios";

// 📥 Cargar servicios
async function cargarServicios() {
  const res = await fetch(API);
  const data = await res.json();

  const tabla = document.getElementById("tablaServicios");
  tabla.innerHTML = "";

  data.forEach(s => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${s.idServicio}</td>
      <td>${s.mascota}</td>
      <td>${s.tipoServicio}</td>
      <td>${s.fechaServicio}</td>
      <td>$${s.precio}</td>
    `;

    tabla.appendChild(row);
  });
}

// ➕ Crear servicio
document.getElementById("formServicio").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevoServicio = {
    idAnimal: document.getElementById("idAnimal").value,
    idUsuario: document.getElementById("idUsuario").value,
    tipoServicio: document.getElementById("tipoServicio").value,
    descripcion: document.getElementById("descripcion").value,
    fechaServicio: document.getElementById("fechaServicio").value,
    precio: document.getElementById("precio").value
  };

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevoServicio)
  });

  const data = await res.json();

  if (res.ok) {
    alert("✅ Servicio registrado");
    document.getElementById("formServicio").reset();
    cargarServicios();
  } else {
    alert("❌ Error: " + JSON.stringify(data));
  }
});

// 🚀 Inicial
cargarServicios();