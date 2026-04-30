// ============================================================
// VetSy — js/login.js
// Conecta con POST /api/login → authController.js → DB Railway
// El backend responde: { success: true, user: {...} }
//                  o: { success: false, message: "..." }
// ============================================================

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username  = document.getElementById("username").value.trim();
  const password  = document.getElementById("password").value.trim();
  const errorBox  = document.getElementById("loginError");
  const btnSubmit = e.target.querySelector("button[type='submit']");

  // Ocultar error previo
  errorBox.classList.remove("visible");

  // Deshabilitar botón mientras espera respuesta
  btnSubmit.disabled = true;
  btnSubmit.textContent = "Ingresando...";

  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      // Guardar usuario en sesión para usarlo en otras páginas
      sessionStorage.setItem("usuario", JSON.stringify(data.user));
      // Redirigir al inicio
      window.location.href = "/index.html";
    } else {
      // Mostrar mensaje del backend dentro del formulario
      errorBox.textContent = data.message || "Usuario o contraseña incorrectos.";
      errorBox.classList.add("visible");
    }

  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    errorBox.textContent = "No se pudo conectar con el servidor. Verifica que esté corriendo en el puerto 3000.";
    errorBox.classList.add("visible");
  } finally {
    // Restaurar botón siempre
    btnSubmit.disabled = false;
    btnSubmit.textContent = "Ingresar";
  }
});
