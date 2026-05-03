const BASE_URL = "https://vetsy-production.up.railway.app";

let animalesCache = [];

/* =========================
   OBTENER ANIMALES
========================= */
async function obtenerAnimales() {
  const res = await fetch(`${BASE_URL}/animales`);
  const data = await res.json();

  animalesCache = data;

  document.getElementById("tablaAnimales").innerHTML = data.map(a => `
    <tr>
      <td>${a.idAnimal}</td>
      <td>${a.nombre}</td>
      <td>${a.raza || ""}</td>
      <td>${a.genero}</td>
      <td>${a.idCliente}</td>
      <td>
        <button onclick="cargarAnimal(${a.idAnimal})">Editar</button>
        <button onclick="eliminarAnimal(${a.idAnimal})">Eliminar</button>
      </td>
    </tr>
  `).join("");
}

/* =========================
   BUSCADOR EDITAR
========================= */
function buscarAnimalEditar(texto) {
  const box = document.getElementById("sugerenciasAnimales");

  if (!texto) {
    box.innerHTML = "";
    return;
  }

  const filtrados = animalesCache.filter(a =>
    a.nombre.toLowerCase().includes(texto.toLowerCase())
  );

  box.innerHTML = filtrados.map(a => `
    <div class="sugerencia" onclick="cargarAnimal(${a.idAnimal})">
      ${a.nombre}
    </div>
  `).join("");
}

/* =========================
   CARGAR EN EDITOR
========================= */
function cargarAnimal(id) {
  const a = animalesCache.find(x => x.idAnimal === id);

  document.getElementById("idAnimal").value = a.idAnimal;
  document.getElementById("idClienteUpd").value = a.idCliente;
  document.getElementById("nombreUpd").value = a.nombre;
  document.getElementById("fechaUpd").value = a.fechaNacimiento;
  document.getElementById("razaUpd").value = a.raza;
  document.getElementById("generoUpd").value = a.genero;

  document.getElementById("panelAnimal").style.display = "block";
  document.getElementById("buscarAnimal").value = a.nombre;
  document.getElementById("sugerenciasAnimales").innerHTML = "";
}

/* =========================
   CERRAR EDITOR
========================= */
function cerrarAnimal() {
  document.getElementById("panelAnimal").style.display = "none";
}

/* =========================
   ACTUALIZAR ANIMAL
========================= */
async function actualizarAnimal() {
  const id = document.getElementById("idAnimal").value;

  await fetch(`${BASE_URL}/animales/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idCliente: document.getElementById("idClienteUpd").value,
      nombre: document.getElementById("nombreUpd").value,
      fechaNacimiento: document.getElementById("fechaUpd").value,
      raza: document.getElementById("razaUpd").value,
      genero: document.getElementById("generoUpd").value
    })
  });

  obtenerAnimales();
  cerrarAnimal();
}

/* =========================
   ELIMINAR ANIMAL
========================= */
async function eliminarAnimal(id) {
  await fetch(`${BASE_URL}/animales/${id}`, {
    method: "DELETE"
  });

  obtenerAnimales();
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", obtenerAnimales);