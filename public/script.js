const API_URL = "http://localhost:3000/bd";

const cards = document.getElementById("cards");

async function carregarAlunos() {
    try {
        const response = await fetch(API_URL);
        const pessoas = await response.json();
        cards.innerHTML = "";

        pessoas.forEach(pessoa => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <div class="container">
                    <p><strong>Código de Identificação:</strong>${pessoa.id}</p>
                    <p><strong>Nome:</strong>${pessoa.nome}</p>
                    <p><strong>Idade:</strong>${pessoa.idade}</p>
                    <p><strong>Profissão:</strong>${pessoa.profissao}</p>
                </div>
            `;

            cards.appendChild(card);
        })
    } catch (err) {
        console.error("Erro ao carregar", err);
    }
}

carregarAlunos();