const API_URL = "http://localhost:3000";

document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Erro no login");
      return;
    }

    localStorage.setItem("token", data.token);

    window.location.href = "index.html";
  } catch (err) {
    console.error("Erro no login", err);
  }
});

if (localStorage.getItem("token")) {
  window.location.href = "index.html";
}