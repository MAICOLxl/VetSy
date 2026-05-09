const BASE_URL = "https://vetsy-production.up.railway.app";

let productos = [];

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

    if (!idProducto) {
      return mostrarMensaje("Selecciona un producto.", "error");
    }

    if (isNaN(cantidad) || cantidad <= 0) {
      return mostrarMensaje("Cantidad inválida.", "error");
    }

    btn.disabled = true;
    btn.textContent = "Guardando...";

    try {

      // BUSCAR PRODUCTO EN MEMORIA
      const producto = productos.find(
        p => p.idProducto == idProducto
      );

      if (!producto) {
        throw new Error("Producto no encontrado");
      }

      let nuevoStock = producto.stockActual;

      // ENTRADA
      if (tipoMovimiento === "E") {

        nuevoStock += cantidad;

      } else {

        // VALIDAR STOCK
        if (producto.stockActual < cantidad) {
          throw new Error("Stock insuficiente");
        }

        nuevoStock -= cantidad;
      }

      // REGISTRAR MOVIMIENTO
      const movimientoPayload = {
        idProducto,
        tipoMovimiento,
        cantidad,
        fechaMovimiento,
        referencia
      };

      const movimientoRes = await fetch(`${BASE_URL}/movimientos`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(movimientoPayload)

      });

      if (!movimientoRes.ok) {
        throw new Error("No se pudo registrar movimiento");
      }

      // ACTUALIZAR PRODUCTO
      const productoActualizado = {
        ...producto,
        stockActual: nuevoStock
      };

      const updateRes = await fetch(`${BASE_URL}/productos/${idProducto}`, {

        method: "PUT",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(productoActualizado)

      });

      if (!updateRes.ok) {
        throw new Error("No se pudo actualizar stock");
      }

      mostrarMensaje("Movimiento registrado correctamente.", "success");

      // ACTUALIZAR STOCK LOCAL
      producto.stockActual = nuevoStock;

      form.reset();

      // RECARGAR SELECT
      document.getElementById("idProducto").innerHTML =
        `<option value="">-- Selecciona un producto --</option>`;

      cargarProductos();

    } catch (err) {

      console.error(err);

      mostrarMensaje(err.message, "error");

    } finally {

      btn.disabled = false;
      btn.textContent = originalText;
    }

  });

});

async function cargarProductos() {

  try {

    const res = await fetch(`${BASE_URL}/productos`);

    let data = await res.json();

    if (!Array.isArray(data) && data.data) {
      data = data.data;
    }

    productos = data;

    const select = document.getElementById("idProducto");

    data.forEach((p) => {

      const option = document.createElement("option");

      option.value = p.idProducto;

      option.textContent =
        `${p.nombre} (Stock: ${p.stockActual})`;

      select.appendChild(option);

    });

  } catch (err) {

    console.error(err);

    mostrarMensaje(
      "No se pudieron cargar los productos",
      "error"
    );
  }
}

function mostrarMensaje(texto, tipo) {

  const anterior = document.getElementById("msg");

  if (anterior) anterior.remove();

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
