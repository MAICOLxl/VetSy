const BASE_URL = "https://vetsy-production.up.railway.app";

let serviciosCache = [];
let animalesCache = [];
let clientesCache = [];
let usuariosCache = [];

// 🔥 MAPAS O(1)
let animalesMap = {};
let clientesMap = {};
let usuariosMap = {};

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  obtenerTodo();

  const form = document.getElementById("formServicio");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      crearServicio();
    });
  }
});

/* =========================
   CARGAR TODO
========================= */
async function obtenerTodo() {
  await Promise.all([
    obtenerAnimales(),
    obtenerClientes(),
    obtenerUsuarios(), // 🔥 nuevo
    obtenerServicios()
  ]);

  construirMapas();
  renderTabla();
}

/* =========================
   MAPAS O(1)
========================= */
function construirMapas() {
  animalesMap = {};
  clientesMap = {};
  usuariosMap = {};

  animalesCache.forEach(a => {
    animalesMap[a.idAnimal] = a;
  });

  clientesCache.forEach(c => {
    clientesMap[c.idCliente] = c;
  });

  usuariosCache.forEach(u => {
    usuariosMap[u.idUsuario] = u;
  });
}

/* =========================
   FETCH
========================= */
async function obtenerServicios() {
  const res = await fetch(`${BASE_URL}/servicios`);
  serviciosCache = await res.json();
}

async function obtenerAnimales() {
  const res = await fetch(`${BASE_URL}/animales`);
  animalesCache = await res.json();
}

async function obtenerClientes() {
  const res = await fetch(`${BASE_URL}/clientes`);
  clientesCache = await res.json();
}

async function obtenerUsuarios() {
  const res = await fetch(`${BASE_URL}/usuarios`);
  usuariosCache = await res.json();
}

/* =========================
   CREAR SERVICIO
========================= */
async function crearServicio() {
  const idAnimal = document.getElementById("idAnimal").value;
  const idUsuario = document.getElementById("idUsuario").value;

  const animal = animalesMap[idAnimal];

  if (!animal) {
    alert("❌ El animal no existe");
    return;
  }

  // 🔥 validar contra USUARIOS (empleados)
  if (!usuariosMap[idUsuario]) {
    alert("❌ El usuario (empleado) no existe");
    return;
  }

  const res = await fetch(`${BASE_URL}/servicios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAnimal,
      idUsuario,
      tipoServicio: document.getElementById("tipoServicio").value,
      descripcion: document.getElementById("descripcion").value,
      fechaServicio: document.getElementById("fechaServicio").value,
      precio: document.getElementById("precio").value
    })
  });

  if (!res.ok) {
    alert("❌ Error al guardar servicio");
    return;
  }

  document.getElementById("formServicio").reset();
  obtenerTodo();
}

/* =========================
   TABLA FINAL
========================= */
function renderTabla() {
  document.getElementById("tablaServicios").innerHTML = serviciosCache.map(s => {

    const animal = animalesMap[s.idAnimal];
    const dueno = animal ? clientesMap[animal.idCliente] : null;
    const usuario = usuariosMap[s.idUsuario];

    return `
      <tr>
        <td>${s.idServicio}</td>

        <td>${animal ? animal.nombre : "—"}</td>
        <td>${dueno ? dueno.nombre : "—"}</td>

        <!-- 🔥 USUARIO EMPLEADO -->
        <td>${usuario ? usuario.nombre || usuario.username : s.idUsuario}</td>

        <td>${s.tipoServicio}</td>
        <td>${s.descripcion || ""}</td>
        <td>${s.fechaServicio ? s.fechaServicio.split("T")[0] : ""}</td>
        <td>${s.precio}</td>

        <td>
          <button onclick="cargarServicio(${s.idServicio})">Editar</button>
          <button onclick="eliminarServicio(${s.idServicio})">Eliminar</button>
        </td>
      </tr>
    `;
  }).join("");
}

/* =========================
   EDITAR
========================= */
function cargarServicio(id) {
  const s = serviciosCache.find(x => x.idServicio === id);
  if (!s) return;

  document.getElementById("idServicio").value = s.idServicio;
  document.getElementById("idAnimalUpd").value = s.idAnimal;
  document.getElementById("idUsuarioUpd").value = s.idUsuario;
  document.getElementById("tipoServicioUpd").value = s.tipoServicio;
  document.getElementById("descripcionUpd").value = s.descripcion;
  document.getElementById("fechaServicioUpd").value =
    s.fechaServicio ? s.fechaServicio.split("T")[0] : "";
  document.getElementById("precioUpd").value = s.precio;

  document.getElementById("panelServicio").style.display = "block";
}

/* =========================
   ACTUALIZAR
========================= */
async function actualizarServicio() {
  const id = document.getElementById("idServicio").value;

  const res = await fetch(`${BASE_URL}/servicios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAnimal: document.getElementById("idAnimalUpd").value,
      idUsuario: document.getElementById("idUsuarioUpd").value,
      tipoServicio: document.getElementById("tipoServicioUpd").value,
      descripcion: document.getElementById("descripcionUpd").value,
      fechaServicio: document.getElementById("fechaServicioUpd").value,
      precio: document.getElementById("precioUpd").value
    })
  });

  if (!res.ok) {
    alert("❌ Error al actualizar");
    return;
  }

  cerrarServicio();
  obtenerTodo();
}

/* =========================
   ELIMINAR
========================= */
async function eliminarServicio(id) {
  await fetch(`${BASE_URL}/servicios/${id}`, {
    method: "DELETE"
  });

  obtenerTodo();
}

/* =========================
   BUSCADOR
========================= */
function buscarServicioEditar(texto) {
  const box = document.getElementById("sugerenciasServicios");

  if (!texto) {
    box.innerHTML = "";
    return;
  }

  const filtrados = serviciosCache.filter(s =>
    s.tipoServicio.toLowerCase().includes(texto.toLowerCase()) ||
    String(s.idAnimal).includes(texto)
  );

  box.innerHTML = filtrados.map(s => `
    <div class="sugerencia" onclick="cargarServicio(${s.idServicio})">
      ${s.tipoServicio} - Animal ${s.idAnimal}
    </div>
  `).join("");
}

/* =========================
   CERRAR
========================= */
function cerrarServicio() {
  document.getElementById("panelServicio").style.display = "none";
}