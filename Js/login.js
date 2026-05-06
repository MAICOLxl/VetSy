const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const errorBox = document.getElementById("loginError");

  try {
    const respuesta = await fetch(
      "https://vetsy-production.up.railway.app/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await respuesta.json();

    if (respuesta.ok) {

      // Guardar sesión
      localStorage.setItem(
        "usuario",
        JSON.stringify(data.user)
      );

      // Entrar al sistema
      window.location.href = "index.html";

    } else {

      errorBox.style.display = "block";
      errorBox.textContent = data.message;

    }

  } catch (error) {

    console.error(error);

    errorBox.style.display = "block";
    errorBox.textContent =
      "Error conectando con el servidor";

  }
});