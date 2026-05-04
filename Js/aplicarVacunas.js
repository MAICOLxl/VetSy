const BASE_URL = "https://vetsy-production.up.railway.app";

let animales = [];
let vacunas = [];
let aplicaciones = [];

document.addEventListener("DOMContentLoaded", init);

async function init() {
    await cargarDatos();

    document.getElementById("btnAplicar").addEventListener("click", aplicarVacuna);
    document.getElementById("buscarVacuna").addEventListener("input", debounce(filtrarTabla, 250));
}

/* =========================
   CARGA
========================= */
async function cargarDatos() {

    const [a, v, ap] = await Promise.all([
        fetch(`${BASE_URL}/animales`),
        fetch(`${BASE_URL}/vacunas`),
        fetch(`${BASE_URL}/aplicacion-vacuna`)
    ]);

    animales = await a.json();
    vacunas = await v.json();
    aplicaciones = await ap.json();

    renderSelects();
    renderTabla(aplicaciones);
}

/* =========================
   SELECTS
========================= */
function renderSelects() {

    animalSelect.innerHTML =
        `<option value="">Seleccione un animal</option>` +
        animales.map(a =>
            `<option value="${a.idAnimal}">${a.nombre}</option>`
        ).join("");

    vacunaSelect.innerHTML =
        `<option value="">Seleccione tipo de vacuna</option>` +
        vacunas.map(v =>
            `<option value="${v.idVacuna}">${v.nombre}</option>`
        ).join("");
}

/* =========================
   APLICAR VACUNA (CON ERROR)
========================= */
async function aplicarVacuna() {

    const idAnimal = animalSelect.value;
    const idVacuna = vacunaSelect.value;

    const fechaVacunaVal = fechaVacuna.value;
    const fechaProximaVacunaVal = fechaProximaVacuna.value;

    // =========================
    // 🔥 VALIDACIONES BASE
    // =========================

    if (!idAnimal) {
        alert("❌ Debes seleccionar un animal");
        return;
    }

    if (idVacuna === "") {
        alert("❌ Debes seleccionar el tipo de vacuna suministrada");
        return;
    }

    if (!fechaVacunaVal) {
        alert("❌ Debes seleccionar la fecha de vacunación");
        return;
    }

    if (!fechaProximaVacunaVal) {
        alert("❌ Debes seleccionar la fecha de la próxima vacuna");
        return;
    }

    // =========================
    // 🔥 VALIDACIÓN DE FECHAS
    // =========================

    const fechaActual = new Date(fechaVacunaVal);
    const fechaProxima = new Date(fechaProximaVacunaVal);

    if (fechaProxima < fechaActual) {
        alert("❌ La fecha de la próxima vacuna no puede ser menor que la fecha de aplicación");
        return;
    }

    // =========================
    // 🚀 ENVIAR
    // =========================

    await fetch(`${BASE_URL}/aplicacion-vacuna`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idAnimal,
            idVacuna,
            fechaVacuna: fechaVacunaVal,
            fechaProximaVacuna: fechaProximaVacunaVal
        })
    });

    await cargarDatos();

    alert("✅ Vacuna aplicada correctamente");
}

/* =========================
   TABLA (SOLO FECHA)
========================= */
function renderTabla(data) {

    const tbody = document.getElementById("tablaVacunas");

    tbody.innerHTML = data.map(v => {

        const animal = animales.find(a => a.idAnimal == v.idAnimal);
        const vacuna = vacunas.find(x => x.idVacuna == v.idVacuna);

        return `
        <tr>
            <td>${v.idAplicacion}</td>
            <td>${animal?.nombre || "N/A"}</td>
            <td>${vacuna?.nombre || "N/A"}</td>

            <!-- 🔥 SOLO FECHA SIN HORA -->
            <td>${formatearFecha(v.fechaVacuna)}</td>
            <td>${formatearFecha(v.fechaProximaVacuna)}</td>
        </tr>
        `;
    }).join("");
}

/* =========================
   🔥 FORMATEAR FECHA
========================= */
function formatearFecha(fecha) {
    if (!fecha) return "";

    return fecha.split("T")[0]; // elimina hora
}

/* =========================
   BUSCADOR
========================= */
function filtrarTabla(e) {

    const t = e.target.value.toLowerCase();

    const filtrado = aplicaciones.filter(v => {

        const animal = animales.find(a => a.idAnimal == v.idAnimal);
        const vacuna = vacunas.find(x => x.idVacuna == v.idVacuna);

        return (
            animal?.nombre?.toLowerCase().includes(t) ||
            vacuna?.nombre?.toLowerCase().includes(t) ||
            String(v.idAplicacion).includes(t)
        );
    });

    renderTabla(filtrado);
}

/* =========================
   DEBOUNCE
========================= */
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}