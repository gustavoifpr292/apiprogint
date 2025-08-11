import { Router } from "express";
import { getAllDados } from "../controllers/controller.js";

const rota = Router();

//rota pra retornar os dados
rota.get('/bd', getAllDados);

export default rota;