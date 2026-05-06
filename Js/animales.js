const BASE_URL = "https://vetsy-production.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {
    obtenerAnimales();
    document.getElementById("formAnimal").addEventListener("submit", crearAnimal);
});

async function obtenerAnimales() {
    try {
        const [resA, resC] = await Promise.all([
            fetch(`${BASE_URL}/animales`),
            fetch(`${BASE_URL}/clientes`)
        ]);
        const animales = await resA.json();
        const clientes = await resC.json();

        const clientesMap = clientes.reduce((acc, c) => { acc[c.idCliente] = c.nombre; return acc; }, {});

        document.getElementById("tablaAnimales").innerHTML = animales.map(a => `
            <tr>
                <td>${a.idAnimal}</td>
                <td>${a.nombre}</td>
                <td>${a.raza || '-'}</td>
                <td>${clientesMap[a.idCliente] || 'N/A'}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="eliminarAnimal(${a.idAnimal})">Eliminar</button>
                </td>
            </tr>
        `).join("");
    } catch (e) { console.error(e); }
}

async function crearAnimal(e) {
    e.preventDefault();
    const datos = {
        idCliente: document.getElementById("idCliente").value,
        nombre: document.getElementById("nombre").value,
        raza: document.getElementById("raza").value,
        genero: document.getElementById("genero").value
    };
    await fetch(`${BASE_URL}/animales`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(datos)
    });
    document.getElementById("formAnimal").reset();
    obtenerAnimales();
}

async function eliminarAnimal(id) {
    if(confirm("¿Eliminar?")) {
        await fetch(`${BASE_URL}/animales/${id}`, { method: "DELETE" });
        obtenerAnimales();
    }
}
