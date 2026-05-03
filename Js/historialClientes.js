const BASE_URL = "https://vetsy-production.up.railway.app";

let clientes = [];
let animales = [];
let servicios = [];

let clientesFiltrados = [];

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
    cargarTodo();

    document.getElementById("buscador")
        .addEventListener("keyup", (e) => {
            filtrarClientes(e.target.value);
        });
});

/* =========================
   CARGAR TODO
========================= */
async function cargarTodo() {
    try {
        const [c, a, s] = await Promise.all([
            fetch(`${BASE_URL}/clientes`).then(r => r.json()),
            fetch(`${BASE_URL}/animales`).then(r => r.json()),
            fetch(`${BASE_URL}/servicios`).then(r => r.json())
        ]);

        clientes = c;
        animales = a;
        servicios = s;

        clientesFiltrados = clientes;

        renderTabla();

    } catch (error) {
        console.error("❌ Error cargando datos", error);
    }
}

/* =========================
   HISTORIAL POR CLIENTE
========================= */
function obtenerHistorialCliente(cliente) {

    const animalesCliente = animales.filter(a => a.idCliente === cliente.idCliente);

    const tipos = new Set();

    animalesCliente.forEach(a => {
        servicios.forEach(s => {
            if (s.idAnimal === a.idAnimal) {
                tipos.add(s.tipoServicio);
            }
        });
    });

    return {
        cantidadAnimales: animalesCliente.length,
        nombresAnimales: animalesCliente.map(a => a.nombre).join(", "),
        tiposServicios: Array.from(tipos).join(", ")
    };
}

/* =========================
   RENDER
========================= */
function renderTabla() {
    const tbody = document.getElementById("tablaHistorial");

    tbody.innerHTML = clientesFiltrados.map(c => {

        const h = obtenerHistorialCliente(c);

        return `
            <tr>
                <td>${c.idCliente}</td>
                <td>${c.nombre}</td>
                <td>${c.telefono}</td>
                <td>${c.email || ""}</td>
                <td>${h.cantidadAnimales}</td>
                <td>${h.nombresAnimales || "—"}</td>
                <td>${h.tiposServicios || "—"}</td>
            </tr>
        `;
    }).join("");
}

/* =========================
   BUSCADOR
========================= */
function filtrarClientes(texto) {
    texto = texto.toLowerCase();

    clientesFiltrados = clientes.filter(c =>
        c.nombre.toLowerCase().includes(texto) ||
        String(c.idCliente).includes(texto)
    );

    renderTabla();
}