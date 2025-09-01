const API_URL = "http://localhost:3000";

document.getElementById("formRegister").addEventListener("submit", async (e) => {
e.preventDefault();

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

try {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.message || "Erro ao registrar");
    return;
  }

  alert("Usuário registrado com sucesso! Agora faça login.");
  window.location.href = "login.html";
} catch (err) {
  console.error("Erro ao registrar", err);
}
});