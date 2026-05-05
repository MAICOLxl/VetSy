const BASE_URL = "https://vetsy-production.up.railway.app";

let productos = [];

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();

  document.getElementById("buscador").addEventListener("input", filtrarProductos);
  document.getElementById("filtroCategoria").addEventListener("change", filtrarProductos);
});

async function cargarProductos() {
  const tbody = document.getElementById("tablaBody");
  const sinResultados = document.getElementById("sinResultados");
  const loader = document.getElementById("loader");

  loader.style.display = "block";
  sinResultados.style.display = "none";

  try {
    const response = await fetch(`${BASE_URL}/productos`);
    if (!response.ok) throw new Error(`Error ${response.status}`);

    productos = await response.json();

    // Si la API devuelve { data: [...] } en lugar de array directo
    if (!Array.isArray(productos) && productos.data) productos = productos.data;

    renderTabla(productos);
  } catch (err) {
    console.error("Error al cargar productos:", err);
    tbody.innerHTML = "";
    sinResultados.textContent = "❌ No se pudieron cargar los productos. Intenta de nuevo.";
    sinResultados.style.display = "block";
  } finally {
    loader.style.display = "none";
  }
}

function renderTabla(lista) {
  const tbody = document.getElementById("tablaBody");
  const sinResultados = document.getElementById("sinResultados");
  const contador = document.getElementById("contador");

  tbody.innerHTML = "";

  if (lista.length === 0) {
    sinResultados.textContent = "No se encontraron productos.";
    sinResultados.style.display = "block";
    contador.textContent = "0 productos";
    return;
  }

  sinResultados.style.display = "none";
  contador.textContent = `${lista.length} producto${lista.length !== 1 ? "s" : ""}`;

  lista.forEach((p) => {
    const stockBajo = p.stockActual <= p.stockMinimo;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.idProducto}</td>
      <td>${p.nombre}</td>
      <td>${p.categoria}</td>
      <td>RD$ ${Number(p.precioCompra).toFixed(2)}</td>
      <td>RD$ ${Number(p.precioVenta).toFixed(2)}</td>
      <td class="${stockBajo ? "stock-bajo" : ""}">
        ${p.stockActual}
        ${stockBajo ? '<span class="badge-alerta">⚠ Bajo</span>' : ""}
      </td>
      <td>${p.stockMinimo}</td>
      <td class="td-acciones">
        <button class="btn-eliminar" onclick="eliminarProducto(${p.idProducto})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filtrarProductos() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const categoria = document.getElementById("filtroCategoria").value;

  const filtrados = productos.filter((p) => {
    const coincideTexto =
      p.nombre.toLowerCase().includes(texto) ||
      String(p.idProducto).includes(texto);
    const coincideCategoria = categoria === "" || p.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  renderTabla(filtrados);
}

async function eliminarProducto(id) {
  if (!confirm(`¿Seguro que deseas eliminar el producto #${id}?`)) return;

  try {
    const response = await fetch(`${BASE_URL}/productos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Error ${response.status}`);

    // Eliminar del array local y re-renderizar
    productos = productos.filter((p) => p.idProducto !== id);
    filtrarProductos();
    mostrarToast("✅ Producto eliminado correctamente.", "success");
  } catch (err) {
    console.error(err);
    mostrarToast(`❌ No se pudo eliminar: ${err.message}`, "error");
  }
}

function mostrarToast(texto, tipo) {
  const anterior = document.getElementById("toast");
  if (anterior) anterior.remove();

  const div = document.createElement("div");
  div.id = "toast";
  div.textContent = texto;
  div.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    padding:12px 20px; border-radius:8px; font-size:.9rem; font-weight:500;
    box-shadow:0 4px 12px rgba(0,0,0,.15);
    background:${tipo === "success" ? "#d1fae5" : "#fee2e2"};
    color:${tipo === "success" ? "#065f46" : "#991b1b"};
    border:1px solid ${tipo === "success" ? "#6ee7b7" : "#fca5a5"};
    transition: opacity .3s;
  `;
  document.body.appendChild(div);
  setTimeout(() => { div.style.opacity = "0"; setTimeout(() => div.remove(), 300); }, 4000);
}