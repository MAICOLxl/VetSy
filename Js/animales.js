const API = "http://localhost:3000/api/animales";

// 📥 Cargar animales
async function cargarAnimales() {
  const res = await fetch(API);
  const data = await res.json();

  const tabla = document.getElementById("tablaAnimales");
  tabla.innerHTML = "";

  data.forEach(a => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${a.idAnimal}</td>
      <td>${a.nombre}</td>
      <td>${a.raza || ""}</td>
      <td>${a.genero}</td>
      <td>${a.dueño}</td>
      <td>
        <button onclick="eliminarAnimal(${a.idAnimal})">Eliminar</button>
      </td>
    `;

    tabla.appendChild(row);
  });
}

// ➕ Crear animal
document.getElementById("formAnimal").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevoAnimal = {
    idCliente: document.getElementById("idCliente").value,
    nombre: document.getElementById("nombre").value,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    raza: document.getElementById("raza").value,
    genero: document.getElementById("genero").value
  };

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevoAnimal)
  });

  if (res.ok) {
    alert("Animal registrado");
    document.getElementById("formAnimal").reset();
    cargarAnimales();
  } else {
    const error = await res.json();
    alert("Error: " + JSON.stringify(error));
  }
});

// ❌ Eliminar
async function eliminarAnimal(id) {
  if (!confirm("¿Eliminar animal?")) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  cargarAnimales();
}

// 🚀 Inicial
<<<<<<< Updated upstream
cargarAnimales();
=======
cargarAnimales();


>>>>>>> Stashed changes
