CREATE TABLE pessoas (
	id SERIAL PRIMARY KEY NOT NULL,
	nome VARCHAR(50) NOT NULL,
	idade INT NOT NULL,
	profissao VARCHAR(50)
);

INSERT INTO pessoas(nome, idade, profissao)
VALUES ('Jao', 2, 'Policia');