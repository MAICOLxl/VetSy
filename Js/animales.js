const BASE_URL = "https://vetsy-production.up.railway.app";

let animalesCache = [];

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  obtenerAnimales();

  document.getElementById("formAnimal").addEventListener("submit", (e) => {
    e.preventDefault();
    crearAnimal();
  });
});

/* =========================
   UTIL: MENSAJES UI
========================= */
function mostrarError(msg) {
  console.error(msg);
  const box = document.getElementById("mensajeError");
  if (box) box.textContent = "❌ " + msg;
}

function limpiarError() {
  const box = document.getElementById("mensajeError");
  if (box) box.textContent = "";
}

/* =========================
   OBTENER ANIMALES (READ)
========================= */
async function obtenerAnimales() {
  try {
    limpiarError();

    const [resAnimales, resClientes] = await Promise.all([
      fetch(`${BASE_URL}/animales`),
      fetch(`${BASE_URL}/clientes`)
    ]);

    if (!resAnimales.ok || !resClientes.ok) {
      throw new Error("Error al obtener datos");
    }

    const animales = await resAnimales.json();
    const clientes = await resClientes.json();

    animalesCache = animales;

    // 🔥 MAPA O(1)
    clientesMap = clientes.reduce((acc, c) => {
      acc[c.idCliente] = c;
      return acc;
    }, {});

    document.getElementById("tablaAnimales").innerHTML = animales.map(a => {
      const cliente = clientesMap[a.idCliente];

      return `
        <tr>
          <td>${a.idAnimal}</td>
          <td>${a.nombre}</td>
          <td>${a.raza || ""}</td>
          <td>${a.genero}</td>

          <!-- 👤 NOMBRE DEL DUEÑO -->
          <td>${cliente ? cliente.nombre : "Sin dueño"}</td>

          <td>${a.fechaNacimiento ? a.fechaNacimiento.split("T")[0] : ""}</td>
          <td>
            <button onclick="cargarAnimal(${a.idAnimal})">Editar</button>
            <button onclick="eliminarAnimal(${a.idAnimal})">Eliminar</button>
          </td>
        </tr>
      `;
    }).join("");

  } catch (error) {
    mostrarError("Error al obtener animales");
  }
}

/* =========================
   CREAR ANIMAL (CREATE)
========================= */
async function crearAnimal() {
  try {
    limpiarError();

    const res = await fetch(`${BASE_URL}/animales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idCliente: Number(document.getElementById("idCliente").value),
        nombre: document.getElementById("nombre").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        raza: document.getElementById("raza").value,
        genero: document.getElementById("genero").value
      })
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    document.getElementById("formAnimal").reset();
    obtenerAnimales();

  } catch (error) {
    mostrarError("Error al crear animal");
  }
}

/* =========================
   CARGAR EN EDITOR
========================= */
function cargarAnimal(id) {
  limpiarError();

  const idNum = Number(id);
  const a = animalesCache.find(x => Number(x.idAnimal) === idNum);

  if (!a) {
    mostrarError(`Animal con ID ${id} no encontrado`);
    return;
  }

  document.getElementById("idAnimal").value = a.idAnimal;
  document.getElementById("idClienteUpd").value = a.idCliente;
  document.getElementById("nombreUpd").value = a.nombre;
  document.getElementById("fechaUpd").value = a.fechaNacimiento ? a.fechaNacimiento.split("T")[0] : "";
  document.getElementById("razaUpd").value = a.raza;
  document.getElementById("generoUpd").value = a.genero;

  document.getElementById("panelAnimal").style.display = "block";
}

/* =========================
   ACTUALIZAR ANIMAL (UPDATE)
========================= */
async function actualizarAnimal() {
  try {
    limpiarError();

    const id = document.getElementById("idAnimal").value;

    const res = await fetch(`${BASE_URL}/animales/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idCliente: Number(document.getElementById("idClienteUpd").value),
        nombre: document.getElementById("nombreUpd").value,
        fechaNacimiento: document.getElementById("fechaUpd").value,
        raza: document.getElementById("razaUpd").value,
        genero: document.getElementById("generoUpd").value
      })
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    cerrarAnimal();
    obtenerAnimales();

  } catch (error) {
    mostrarError("Error al actualizar animal");
  }
}

/* =========================
   ELIMINAR ANIMAL (DELETE)
========================= */
async function eliminarAnimal(id) {
  try {
    limpiarError();

    const res = await fetch(`${BASE_URL}/animales/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    obtenerAnimales();

  } catch (error) {
    mostrarError("Error al eliminar animal");
  }
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
   UI
========================= */
function cerrarAnimal() {
  document.getElementById("panelAnimal").style.display = "none";
}