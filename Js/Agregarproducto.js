const BASE_URL = "https://vetsy-production.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {
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

    // 🔥 VALIDACIONES REALES
    if (!idProducto || isNaN(idProducto)) {
      return mostrarMensaje("Selecciona un producto válido desde la lista.", "error");
    }

    if (!tipoMovimiento) {
      return mostrarMensaje("Selecciona tipo de movimiento.", "error");
    }

    if (isNaN(cantidad) || cantidad <= 0) {
      return mostrarMensaje("Cantidad inválida.", "error");
    }

    if (!fechaMovimiento) {
      return mostrarMensaje("Selecciona una fecha.", "error");
    }

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

      if (!res.ok) {
        throw new Error(data.message || "Error al registrar movimiento");
      }

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

  document.querySelector("#formMovimiento button").insertAdjacentElement("afterend", div);

  setTimeout(() => div.remove(), 4000);
}