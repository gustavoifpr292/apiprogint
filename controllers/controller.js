import sampleDados from "../data/sampleDados.js";

export const getAllDados = (req, res) => {
    console.log("Cara se o jao tiver nessa lista de dados eu vou ficar mt puto");
    res.json(sampleDados);
}