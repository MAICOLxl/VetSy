// ============================================================
// VetSy — js/animales.js
// Conecta con /api/animales → GET, POST, DELETE
// ============================================================

const API = "http://localhost:3000/api/animales";

// ─── Mostrar mensaje de éxito o error en la página ─────────
function mostrarMensaje(texto, tipo = "success") {
  // Buscar o crear el elemento de alerta
  let alerta = document.getElementById("mensajeAnimal");
  if (!alerta) {
    alerta = document.createElement("div");
    alerta.id = "mensajeAnimal";
    document.querySelector(".f-area-medica").prepend(alerta);
  }

  alerta.className = `alert alert-${tipo}`;
  alerta.textContent = texto;
  alerta.style.display = "flex";

  // Ocultar automáticamente después de 4 segundos
  setTimeout(() => {
    alerta.style.display = "none";
  }, 4000);
}

// ─── Mostrar estado de carga en la tabla ───────────────────
function mostrarCargando() {
  const tabla = document.getElementById("tablaAnimales");
  tabla.innerHTML = `
    <tr>
      <td colspan="6" style="text-align:center; padding: 24px; color: var(--text-muted);">
        Cargando animales...
      </td>
    </tr>
  `;
}

// ─── Mostrar tabla vacía ────────────────────────────────────
function mostrarTablaVacia() {
  const tabla = document.getElementById("tablaAnimales");
  tabla.innerHTML = `
    <tr>
      <td colspan="6" style="text-align:center; padding: 24px; color: var(--text-muted);">
        No hay animales registrados aún.
      </td>
    </tr>
  `;
}

// ─── 📥 Cargar animales ─────────────────────────────────────
async function cargarAnimales() {
  mostrarCargando();

  try {
    const res  = await fetch(API);

    if (!res.ok) throw new Error("Error al obtener los animales");

    const data = await res.json();
    const tabla = document.getElementById("tablaAnimales");

    if (data.length === 0) {
      mostrarTablaVacia();
      return;
    }

    tabla.innerHTML = "";
    data.forEach(a => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${a.idAnimal}</td>
        <td>${a.nombre}</td>
        <td>${a.raza || "—"}</td>
        <td>${a.genero}</td>
        <td>${a.dueño}</td>
        <td>
          <button class="btn-eliminar" onclick="eliminarAnimal(${a.idAnimal}, this)">
            Eliminar
          </button>
        </td>
      `;
      tabla.appendChild(row);
    });

  } catch (error) {
    console.error("Error al cargar animales:", error);
    const tabla = document.getElementById("tablaAnimales");
    tabla.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding: 24px; color: var(--danger);">
          No se pudo conectar con el servidor.
        </td>
      </tr>
    `;
  }
}

// ─── ➕ Crear animal ────────────────────────────────────────
document.getElementById("formAnimal").addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = e.target.querySelector("button[type='submit']");
  btn.disabled = true;
  btn.textContent = "Registrando...";

  const nuevoAnimal = {
    idCliente:        document.getElementById("idCliente").value,
    nombre:           document.getElementById("nombre").value,
    fechaNacimiento:  document.getElementById("fechaNacimiento").value,
    raza:             document.getElementById("raza").value,
    genero:           document.getElementById("genero").value
  };

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoAnimal)
    });

    if (res.ok) {
      mostrarMensaje("✅ Animal registrado correctamente.", "success");
      document.getElementById("formAnimal").reset();
      cargarAnimales();
    } else {
      const error = await res.json();
      mostrarMensaje("❌ Error: " + (error.message || JSON.stringify(error)), "danger");
    }

  } catch (error) {
    console.error("Error al registrar animal:", error);
    mostrarMensaje("❌ No se pudo conectar con el servidor.", "danger");
  } finally {
    btn.disabled = false;
    btn.textContent = "Registrar Animal";
  }
});

// ─── ❌ Eliminar animal ─────────────────────────────────────
async function eliminarAnimal(id, btn) {
  if (!confirm("¿Estás seguro de que deseas eliminar este animal?")) return;

  // Animación de salida
  const fila = btn.closest("tr");
  fila.style.transition = "opacity 0.3s ease";
  fila.style.opacity    = "0";

  try {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });

    if (res.ok) {
      setTimeout(() => {
        fila.remove();
        mostrarMensaje("✅ Animal eliminado correctamente.", "success");
      }, 300);
    } else {
      fila.style.opacity = "1";
      mostrarMensaje("❌ No se pudo eliminar el animal.", "danger");
    }

  } catch (error) {
    console.error("Error al eliminar animal:", error);
    fila.style.opacity = "1";
    mostrarMensaje("❌ No se pudo conectar con el servidor.", "danger");
  }
}

// ─── 🚀 Cargar al iniciar ───────────────────────────────────
cargarAnimales();
