const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {

        const respuesta = await fetch(
            "https://vetsy-production.up.railway.app/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data = await respuesta.json();

        if (respuesta.ok) {

            localStorage.setItem(
                "usuario",
                JSON.stringify(data.user)
            );

            window.location.href = "index.html";

        } else {

            document.getElementById("mensaje").innerText =
                data.message;

        }

    } catch (error) {

        console.log(error);

    }

});