const BASE_URL = "https://vetsy-production.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("formProveedor")
    .addEventListener("submit", guardarProveedor);

  cargarProveedores();
});

// =============================
// GUARDAR
// =============================
async function guardarProveedor(e) {
  e.preventDefault();

  const btn = document.querySelector("#formProveedor button");
  const originalText = btn.textContent;

  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const extensionTelefono = document.getElementById("extensionTelefono").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nombre) return mostrarMensaje("Nombre obligatorio", "error");
  if (!telefono) return mostrarMensaje("Teléfono obligatorio", "error");

  const payload = { nombre, telefono, extensionTelefono, email };

  btn.disabled = true;
  btn.textContent = "Guardando...";

  try {
    const res = await fetch(`${BASE_URL}/proveedores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Error al guardar");

    mostrarMensaje("Proveedor agregado correctamente", "success");

    document.getElementById("formProveedor").reset();

    cargarProveedores();

  } catch (err) {
    mostrarMensaje(err.message, "error");
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

// =============================
// CARGAR
// =============================
async function cargarProveedores() {
  try {
    const res = await fetch(`${BASE_URL}/proveedores`);
    const data = await res.json();

    const tbody = document.getElementById("tablaProveedores");
    tbody.innerHTML = "";

    data.forEach(p => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${p.idProveedor}</td>
        <td>${p.nombre}</td>
        <td>${p.telefono}</td>
        <td>${p.extensionTelefono || "-"}</td>
        <td>${p.email || "-"}</td>
        <td>
          <button onclick="eliminarProveedor(${p.idProveedor})">Eliminar</button>
        </td>
      `;

      tbody.appendChild(tr);
    });

  } catch (err) {
    mostrarMensaje("Error cargando proveedores", "error");
  }
}

// =============================
// ELIMINAR
// =============================
async function eliminarProveedor(id) {
  if (!confirm("¿Seguro que quieres eliminar este proveedor?")) return;

  try {
    const res = await fetch(`${BASE_URL}/proveedores/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error("Error al eliminar");

    mostrarMensaje("Proveedor eliminado", "success");
    cargarProveedores();

  } catch (err) {
    mostrarMensaje(err.message, "error");
  }
}

// =============================
// MENSAJES
// =============================
function mostrarMensaje(texto, tipo) {
  const anterior = document.getElementById("formMensaje");
  if (anterior) anterior.remove();

  const div = document.createElement("div");
  div.id = "formMensaje";
  div.textContent = texto;

  div.style.cssText = `
    margin-top:10px;
    padding:10px;
    border-radius:6px;
    font-size:14px;
    background:${tipo === "success" ? "#d1fae5" : "#fee2e2"};
    color:${tipo === "success" ? "#065f46" : "#991b1b"};
  `;

  document.querySelector("#formProveedor button")
    .insertAdjacentElement("afterend", div);

  setTimeout(() => div.remove(), 4000);
}