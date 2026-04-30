const API = "http://localhost:3000/api/auth/login";

document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "index.html";
  } else {
    alert(data.message);
  }
});