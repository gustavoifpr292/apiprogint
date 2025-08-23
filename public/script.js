const API_URL = "http://localhost:3000/bd/";

const form = document.getElementById("formCadastro");
const cards = document.getElementById("cards");
let editId = null;

async function cadastrarPessoa(e) {
    e.preventDefault();
    const pessoa = {
        nome: document.getElementById("nome").value,
        idade: document.getElementById("idade").value,
        profissao: document.getElementById("profissao").value
    }
    
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
            headers: {"Content-Type": "application/json"},
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

async function editarPessoa(id) {
    editId = id;
    try {
        const response = await fetch(API_URL + id);
        const pessoa = await response.json();
        if (!pessoa) throw new Error("Pessoa não existe");
        
        document.getElementById("nome").value = pessoa.nome;
        document.getElementById("idade").value = pessoa.idade;
        document.getElementById("profissao").value = pessoa.profissao;
    } catch(error) {
        console.error("Erro ao editar", error);
    }
}

async function excluirPessoa(id) {
    try {
        const response = await fetch(API_URL + id, {method: 'DELETE'});
	const sucesso = await response.json();
	alert("Removido com sucesso!");
        carregarPessoas();
    } catch (error) {
        console.error("Erro ao carregar", error);
    }
}

async function carregarPessoas() {
    try {
        const response = await fetch(API_URL);
        const pessoas = await response.json();
        cards.innerHTML = "";

        pessoas.forEach(pessoa => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <div class="container">
                    <p><strong>Nome:</strong> ${pessoa.nome}</p>
                    <p><strong>Idade:</strong> ${pessoa.idade}</p>
                    <p><strong>Profissão:</strong> ${pessoa.profissao}</p>
                    <button onClick="editarPessoa('${pessoa.id}')">Editar</button>
                    <button onClick="excluirPessoa('${pessoa.id}')">Excluir</button>
                </div>
            `;

            cards.appendChild(card);
        })
    } catch (error) {
        console.error("Erro ao carregar", error);
    }
}

form.addEventListener("submit", cadastrarPessoa);

carregarPessoas();