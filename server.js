import express from "express";
import dataRoutes from "./routes/routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors);

//Middleware para interpretar o JSON
app.use(express.json());

//Rota da API
app.use('/', dataRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})