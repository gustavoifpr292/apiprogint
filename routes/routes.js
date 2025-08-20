import { Router } from "express";
import { getAllDados, deletePessoa } from "../controllers/controller.js";

const rota = Router();

//rota pra retornar os dados
rota.get('/bd', getAllDados);

rota.delete('/bd/:id', deletePessoa);

export default rota;