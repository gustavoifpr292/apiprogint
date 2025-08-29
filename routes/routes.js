import { Router } from "express";
import { getAllDados, criarPessoa, deletePessoa, getPessoa, editPessoa } from "../controllers/controller.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authMiddleware from "../middleware/middleware.js";

const rota = Router();

//rota pra retornar os dados
rota.get('/bd', getAllDados);

rota.post('/bd', criarPessoa);

rota.get('/bd/:id', getPessoa);

rota.put('/bd/:id', editPessoa);

rota.delete('/bd/:id', deletePessoa);

export default rota;