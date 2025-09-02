const API_URL = "http://localhost:3000/bd/";

const token = localStorage.getItem("token");
let user = null;
async function getUser() {
  try {
    const response = await fetch("http://localhost:3000/profile", {
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
    });

    if (!response.ok) {
        alert("Sua token expirou ou é inválida");
        logout();
        throw new Error("o relogio gira");
    }
    const data = await response.json();
    user = data;
    const saudacao = document.getElementById("saudacao");
    saudacao.innerHTML += `${user.username}!`;
    //console.log(user);
  } catch (err) {
    console.error(err);
  }
}

getUser();

const form = document.getElementById("formCadastro");
const cards = document.getElementById("cards");
const buscaInput = document.getElementById("busca");
let editId = null;

async function cadastrarPessoa(e) {
    e.preventDefault();
    const pessoa = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        idade: document.getElementById("idade").value,
        profissao: document.getElementById("profissao").value,
        email: document.getElementById("email").value,
        usuario: user.username
    }
   
    //console.log(pessoa);
    
    let method = '';
    let url = API_URL;
    if (!editId) {
        method = 'POST';
    } else { 
        method = 'PUT';
        url += editId;
    }

    try {
        const response = await fetch(url, {
            method,
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`, "Username": user.username},
            body: JSON.stringify(pessoa)
        });

        if (!response.ok) throw new Error("Falha ao salvar");

        alert(`Pessoa ${editId ? "editada" : "cadastrada"} com sucesso!`);
        form.reset();
        carregarPessoas();
        editId = null;
    } catch(error) {
        console.error("Erro ao cadastrar", error);
    }    
}

async function editarPessoa(id, usuario) {
    try {
        const response = await fetch(API_URL + id, {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`, "Username": usuario},
        });
        const pessoa = await response.json();
        console.log(pessoa);
        if (!pessoa) throw new Error("Pessoa não existe ou você não tem acesso");
        editId = id;
        
        document.getElementById("nome").value = pessoa.nome;
        document.getElementById("cpf").value = pessoa.cpf;
        document.getElementById("idade").value = pessoa.idade;
        document.getElementById("profissao").value = pessoa.profissao;
        document.getElementById("email").value = pessoa.email;
    } catch(error) {
        console.error("Erro ao editar", error);
    }
}

async function excluirPessoa(id, usuario) {
    try {
        const response = await fetch(API_URL + id, {
          method: 'DELETE',
          headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`, "Username": usuario}
        });
	const sucesso = await response.json();
	alert("Removido com sucesso!");
        carregarPessoas();
    } catch (error) {
        console.error("Erro ao carregar", error);
    }
}

async function carregarPessoas(filtro = "") {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token}`}
        });
        const listaPessoas = await response.json();

        const pessoas = listaPessoas.filter(pessoa => 
          pessoa.nome.toLowerCase().includes(filtro.toLowerCase())
        );
                
        cards.innerHTML = "";

        pessoas.forEach(pessoa => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <div class="container">
                    <p><strong>Nome:</strong> ${pessoa.nome}</p>
                    <p><strong>CPF:</strong> ${pessoa.cpf}</p>
                    <p><strong>Idade:</strong> ${pessoa.idade}</p>
                    <p><strong>Profissão:</strong> ${pessoa.profissao}</p>
                    <p><strong>Email:</strong> ${pessoa.email}</p>
                    <button class="btn-edit" onClick="editarPessoa('${pessoa.id}', '${pessoa.usuario}')">Editar</button>
                    <button class="btn-delete" onClick="excluirPessoa('${pessoa.id}', '${pessoa.usuario}')">Excluir</button>
                </div>
            `;

            cards.appendChild(card);
        })
    } catch (error) {
        console.error("Erro ao carregar", error);
    }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

form.addEventListener("submit", cadastrarPessoa);

buscaInput.addEventListener("input", () => {
  carregarPessoas(buscaInput.value);
});

carregarPessoas();