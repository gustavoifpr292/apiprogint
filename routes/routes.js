import { Router } from "express";
import { isUser, getAllDados, criarPessoa, deletePessoa, getPessoa, editPessoa } from "../controllers/controller.js";
import { authMiddleware } from "../middleware/middleware.js";

const rota = Router();

//rota pra retornar os dados
rota.get('/bd', authMiddleware, getAllDados);

rota.post('/bd', authMiddleware, criarPessoa);

rota.get('/bd/:id', authMiddleware, isUser, getPessoa);

rota.put('/bd/:id', authMiddleware, isUser, editPessoa);

rota.delete('/bd/:id', authMiddleware, isUser, deletePessoa);

export default rota;