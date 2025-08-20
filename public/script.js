const API_URL = "http://localhost:3000/bd/";

const cards = document.getElementById("cards");

async function excluirPessoa(id) {
    try {
        const response = await fetch(API_URL + id, {method: 'DELETE'});
	const sucesso = await response.json();
	alert("Removido com sucesso!");
        document.getElementById(`pessoa${id}`).remove();
    } catch (error) {
        console.error("Erro ao carregar", error);
    }
}

async function carregarAlunos() {
    try {
        const response = await fetch(API_URL);
        const pessoas = await response.json();
        cards.innerHTML = "";

        pessoas.forEach(pessoa => {
            const card = document.createElement("div");
            card.className = "card";

            console.log(pessoa);
            card.innerHTML = `
                <div class="container" id="pessoa${pessoa.id}">
                    <p><strong>Código de Identificação:</strong> ${pessoa.id}</p>
                    <p><strong>Nome:</strong> ${pessoa.nome}</p>
                    <p><strong>Idade:</strong> ${pessoa.idade}</p>
                    <p><strong>Profissão:</strong> ${pessoa.profissao}</p>
                    <button onClick="excluirPessoa(${pessoa.id})">Excluir</button>
                </div>
            `;

            cards.appendChild(card);
        })
    } catch (error) {
        console.error("Erro ao carregar", error);
    }
}

carregarAlunos();