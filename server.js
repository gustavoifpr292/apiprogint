import express from "express";
import dataRoutes from "./routes/routes.js";
import dataRoutesMiddleware from "./routes/routesMiddleware.js";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

//Rota da API
app.use('/', dataRoutes);
app.use('/', dataRoutesMiddleware);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})