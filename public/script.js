const API_URL = "http://localhost:3000/bd";

const cards = document.getElementById("cards");

async function carregarAlunos() {
    try {
        const response = await fetch(API_URL, {mode: 'no-cors'});
        const pessoas = await response.json();
        cards.innerHTML = "";

        pessoas.forEach(pessoa => {
            const card = document.createElement("div");
            card.className = "card";

            console.log(pessoa);
            card.innerHTML = `
                <div class="container">
                    <p><strong>Código de Identificação:</strong> ${pessoa.id}</p>
                    <p><strong>Nome:</strong> ${pessoa.nome}</p>
                    <p><strong>Idade:</strong> ${pessoa.idade}</p>
                    <p><strong>Profissão:</strong> ${pessoa.profissao}</p>
                </div>
            `;

            cards.appendChild(card);
        })
    } catch (error) {
        console.error("Erro ao carregar", error);
    } finally {
        console.log("tem nada pra ver nn porra");
    }
}

carregarAlunos();