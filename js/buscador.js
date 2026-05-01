// ============================================================
// VetSy — js/buscador.js
// Filtro en tiempo real para la tabla de productos
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.getElementById("buscador");
  if (!buscador) return;

  buscador.addEventListener("input", function () {
    const termino = this.value.toLowerCase().trim();
    const filas   = document.querySelectorAll("#tabla-productos tr");

    filas.forEach(fila => {
      const texto = fila.textContent.toLowerCase();
      fila.style.display = texto.includes(termino) ? "" : "none";
    });
  });
});

// ============================================================
// Eliminar producto — con confirmación y animación
// ============================================================
function eliminarProducto(id, btn) {
  if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

  const fila = btn.closest("tr");
  fila.style.transition = "opacity 0.3s ease";
  fila.style.opacity    = "0";

  setTimeout(() => fila.remove(), 300);

  // Cuando tengas endpoint DELETE listo, descomenta esto:
  // fetch(`http://localhost:3000/api/productos/${id}`, { method: "DELETE" })
  //   .then(res => res.json())
  //   .then(data => console.log("Eliminado del servidor:", data))
  //   .catch(err => console.error("Error al eliminar:", err));
}
