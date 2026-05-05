// ============================================================
// VetSy — Js/login.js
// Conecta con POST /usuarios/login → backend Railway
// ============================================================

const BASE_URL = "https://vetsy-production.up.railway.app";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username  = document.getElementById("username").value.trim();
  const password  = document.getElementById("password").value.trim();
  const errorBox  = document.getElementById("loginError");
  const btn       = e.target.querySelector("button[type='submit']");

  errorBox.classList.remove("visible");
  btn.disabled = true;
  btn.textContent = "Ingresando...";

  try {
    const response = await fetch(`${BASE_URL}/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      // Guardar en ambos para compatibilidad
      sessionStorage.setItem("usuario", JSON.stringify(data.user));
      localStorage.setItem("usuario", JSON.stringify(data.user));
      window.location.href = "/index.html";
    } else {
      errorBox.textContent = data.message || "Usuario o contraseña incorrectos.";
      errorBox.classList.add("visible");
    }

  } catch (error) {
    console.error("Error:", error);
    errorBox.textContent = "No se pudo conectar con el servidor.";
    errorBox.classList.add("visible");
  } finally {
    btn.disabled = false;
    btn.textContent = "Ingresar";
  }
});
