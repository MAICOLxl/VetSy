const BASE_URL = "https://vetsy-production.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProducto");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await guardarProducto();
  });
});

async function guardarProducto() {
  const form = document.getElementById("formProducto");

  const btn = form.querySelector("button[type='submit']");
  const originalText = btn.textContent;

  // Obtener datos
  const nombre = document.getElementById("nombre").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const categoria = document.getElementById("categoria").value;
  const precioCompra = parseFloat(document.getElementById("precioCompra").value);
  const precioVenta = parseFloat(document.getElementById("precioVenta").value);
  const stockActual = parseInt(document.getElementById("stockActual").value);
  const stockMinimo = parseInt(document.getElementById("stockMinimo").value);

  // VALIDACIONES
  if (!nombre) {
    return mostrarMensaje("Ingresa el nombre del producto.", "error");
  }

  if (!categoria) {
    return mostrarMensaje("Selecciona una categoría.", "error");
  }

  if (isNaN(precioCompra) || precioCompra < 0) {
    return mostrarMensaje("Precio de compra inválido.", "error");
  }

  if (isNaN(precioVenta) || precioVenta < 0) {
    return mostrarMensaje("Precio de venta inválido.", "error");
  }

  if (isNaN(stockActual) || stockActual < 0) {
    return mostrarMensaje("Stock inicial inválido.", "error");
  }

  if (isNaN(stockMinimo) || stockMinimo < 0) {
    return mostrarMensaje("Stock mínimo inválido.", "error");
  }

  const payload = {
    nombre,
    descripcion,
    categoria,
    precioCompra,
    precioVenta,
    stockActual,
    stockMinimo
  };

  btn.disabled = true;
  btn.textContent = "Guardando...";

  try {
    const res = await fetch(`${BASE_URL}/productos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || "Error al guardar producto");
    }

    mostrarMensaje("Producto agregado correctamente.", "success");

    form.reset();

  } catch (err) {
    console.error(err);
    mostrarMensaje(err.message || "Error del servidor.", "error");
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

function mostrarMensaje(texto, tipo) {
  const anterior = document.getElementById("formMensaje");

  if (anterior) anterior.remove();

  const div = document.createElement("div");

  div.id = "formMensaje";
  div.textContent = texto;

  div.style.cssText = `
    margin-top: 12px;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    background: ${tipo === "success" ? "#d1fae5" : "#fee2e2"};
    color: ${tipo === "success" ? "#065f46" : "#991b1b"};
    border: 1px solid ${tipo === "success" ? "#10b981" : "#ef4444"};
  `;

  const btn = document.querySelector("#formProducto button");

  btn.insertAdjacentElement("afterend", div);

  setTimeout(() => {
    div.remove();
  }, 4000);
}
