const BASE_URL = "https://vetsy-production.up.railway.app";

let clientesCache = [];

/* =========================
   OBTENER CLIENTES
========================= */
async function obtenerClientes() {
  const res = await fetch(`${BASE_URL}/clientes`);
  const data = await res.json();

  clientesCache = data;

  document.getElementById("tablaClientes").innerHTML = data.map(c => `
    <tr>
      <td>${c.idCliente}</td>
      <td>${c.nombre}</td>
      <td>${c.telefono}</td>
      <td>${c.email || ""}</td>
      <td>
        <button onclick="cargarEnEditar(${c.idCliente})">Editar</button>
        <button onclick="eliminarCliente(${c.idCliente})">Eliminar</button>
      </td>
    </tr>
  `).join("");
}

/* =========================
   BUSCADOR SOLO EDITAR
========================= */
function buscarClienteEditar(texto) {
  const box = document.getElementById("sugerenciasEditar");

  if (!texto) {
    box.innerHTML = "";
    return;
  }

  const filtrados = clientesCache.filter(c =>
    c.nombre.toLowerCase().includes(texto.toLowerCase())
  );

  box.innerHTML = filtrados.map(c => `
    <div class="sugerencia" onclick="cargarEnEditar(${c.idCliente})">
      ${c.nombre}
    </div>
  `).join("");
}

/* =========================
   CARGAR EN FORM EDITAR
========================= */
function cargarEnEditar(id) {
  const c = clientesCache.find(x => x.idCliente === id);

  document.getElementById("idActualizar").value = c.idCliente;
  document.getElementById("nombreUpd").value = c.nombre;
  document.getElementById("telefonoUpd").value = c.telefono;
  document.getElementById("emailUpd").value = c.email;
  document.getElementById("direccionUpd").value = c.direccion;

  document.getElementById("buscarEditar").value = c.nombre;
  document.getElementById("sugerenciasEditar").innerHTML = "";
}

/* =========================
   CREAR
========================= */
async function crearCliente() {
  const cliente = {
    nombre: nombre.value,
    telefono: telefono.value,
    email: email.value,
    direccion: direccion.value
  };

  await fetch(`${BASE_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente)
  });

  obtenerClientes();
}

/* =========================
   ACTUALIZAR
========================= */
async function actualizarCliente() {
  const id = idActualizar.value;

  await fetch(`${BASE_URL}/clientes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre: nombreUpd.value,
      telefono: telefonoUpd.value,
      email: emailUpd.value,
      direccion: direccionUpd.value
    })
  });

  obtenerClientes();
}

/* =========================
   ELIMINAR
========================= */
async function eliminarCliente(id) {
  await fetch(`${BASE_URL}/clientes/${id}`, {
    method: "DELETE"
  });

  obtenerClientes();
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", obtenerClientes);

function cargarEnEditar(id) {
  const c = clientesCache.find(x => x.idCliente === id);

  document.getElementById("idActualizar").value = c.idCliente;
  document.getElementById("nombreUpd").value = c.nombre;
  document.getElementById("telefonoUpd").value = c.telefono;
  document.getElementById("emailUpd").value = c.email;
  document.getElementById("direccionUpd").value = c.direccion;

  document.getElementById("panelEditar").style.display = "block";
  document.getElementById("sugerenciasEditar").innerHTML = "";
  document.getElementById("buscarEditar").value = c.nombre;
}

/* 🔴 cerrar formulario */
function cerrarEditar() {
  document.getElementById("panelEditar").style.display = "none";

  document.getElementById("idActualizar").value = "";
  document.getElementById("nombreUpd").value = "";
  document.getElementById("telefonoUpd").value = "";
  document.getElementById("emailUpd").value = "";
  document.getElementById("direccionUpd").value = "";
}