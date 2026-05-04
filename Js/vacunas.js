const BASE_URL = "https://vetsy-production.up.railway.app/vacunas";

const form = document.getElementById("formVacuna");
const tabla = document.getElementById("tablaVacunas");

/* =========================
   OBTENER VACUNAS
========================= */
async function obtenerVacunas() {
  const res = await fetch(BASE_URL);
  const data = await res.json();

  tabla.innerHTML = data.map(v => `
    <tr>
      <td>${v.idVacuna}</td>
      <td>${v.nombre}</td>
      <td>${v.descripcion}</td>
      <td>
        <button onclick="editar(${v.idVacuna}, '${v.nombre}', '${v.descripcion}')">Editar</button>
        <button onclick="eliminar(${v.idVacuna})">Eliminar</button>
      </td>
    </tr>
  `).join("");
}

/* =========================
   GUARDAR / ACTUALIZAR
========================= */
form.addEventListener("submit", async e => {
  e.preventDefault();

  const id = document.getElementById("idVacuna").value;
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;

  const data = { nombre, descripcion };

  if (id) {
    // UPDATE
    await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } else {
    // CREATE
    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }

  form.reset();
  document.getElementById("idVacuna").value = "";

  obtenerVacunas();
});

/* =========================
   EDITAR
========================= */
function editar(id, nombre, descripcion) {
  document.getElementById("idVacuna").value = id;
  document.getElementById("nombre").value = nombre;
  document.getElementById("descripcion").value = descripcion;
}

/* =========================
   ELIMINAR
========================= */
async function eliminar(id) {
  if (!confirm("¿Eliminar vacuna?")) return;

  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  obtenerVacunas();
}

/* =========================
   INICIALIZAR
========================= */
obtenerVacunas();