const BASE_URL = "https://vetsy-production.up.railway.app";

const form = document.getElementById("loginForm");
const errorBox = document.getElementById("loginError");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // limpiar errores
  errorBox.style.display = "none";
  errorBox.textContent = "";

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // validación básica
  if (!username || !password) {
    mostrarError("Todos los campos son obligatorios");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    // si el servidor responde error
    if (!res.ok) {
      throw new Error("Credenciales incorrectas");
    }

    const data = await res.json();

    // 🔐 guardar sesión (puedes ajustar según tu API)
    localStorage.setItem("usuario", JSON.stringify(data.usuario || data));
    localStorage.setItem("token", data.token || "");

    // 🚀 redirección
    window.location.href = "/dashboard.html";

  } catch (error) {
    mostrarError(error.message || "Error de conexión con el servidor");
  }
});

// función para mostrar errores
function mostrarError(msg) {
  errorBox.style.display = "block";
  errorBox.textContent = msg;
}