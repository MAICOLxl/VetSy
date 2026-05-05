const BASE_URL = "https://vetsy-production.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();

  const form = document.getElementById("formMovimiento");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");
    const originalText = btn.textContent;

    const idProducto = parseInt(document.getElementById("idProducto").value);
    const tipoMovimiento = document.getElementById("tipoMovimiento").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const fechaMovimiento = document.getElementById("fechaMovimiento").value;
    const referencia = document.getElementById("referencia").value.trim();

    if (!idProducto) return mostrarMensaje("Selecciona un producto.", "error");
    if (!tipoMovimiento) return mostrarMensaje("Selecciona tipo de movimiento.", "error");
    if (isNaN(cantidad) || cantidad <= 0) return mostrarMensaje("Cantidad inválida.", "error");
    if (!fechaMovimiento) return mostrarMensaje("Selecciona fecha.", "error");

    const payload = {
      idProducto,
      tipoMovimiento,
      cantidad,
      fechaMovimiento,
      referencia
    };

    btn.disabled = true;
    btn.textContent = "Guardando...";

    try {
      const res = await fetch(`${BASE_URL}/movimientos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.message || "Error al registrar");

      mostrarMensaje("Movimiento registrado correctamente.", "success");
      form.reset();

    } catch (err) {
      mostrarMensaje(err.message, "error");
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
});

/* CARGAR PRODUCTOS EN SELECT */
async function cargarProductos() {
  try {
    const res = await fetch(`${BASE_URL}/productos`);
    let data = await res.json();

    if (!Array.isArray(data) && data.data) data = data.data;

    const select = document.getElementById("idProducto");

    data.forEach(p => {
      const option = document.createElement("option");
      option.value = p.idProducto;
      option.textContent = `${p.nombre} (Stock: ${p.stockActual})`;
      select.appendChild(option);
    });

  } catch (err) {
    console.error("Error cargando productos", err);
  }
}

/* MENSAJES */
function mostrarMensaje(texto, tipo) {
  const old = document.getElementById("msg");
  if (old) old.remove();

  const div = document.createElement("div");
  div.id = "msg";
  div.textContent = texto;

  div.style.cssText = `
    margin-top:10px;
    padding:10px;
    border-radius:6px;
    font-size:14px;
    background:${tipo === "success" ? "#d1fae5" : "#fee2e2"};
    color:${tipo === "success" ? "#065f46" : "#991b1b"};
  `;

  document.querySelector("#formMovimiento button")
    .insertAdjacentElement("afterend", div);

  setTimeout(() => div.remove(), 4000);
}