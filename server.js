import express from "express";
import dotenv from "dotenv";

import dados from "./src/data/dados.js";
const { bruxos } = dados;

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;


app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

// Query Parameters no Node.js - API de Hogwarts
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;
  
    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase() === casa.toLowerCase());
    }
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

app.post("/bruxos", (req, res) => {
    const {nome, casa, ano, varinha, mascote, patrono, especialidade, vivo} = req.body;

    if (!nome || !casa || !ano || !vivo) {
        return res.status(400).json({
            success: false,
            message: "Nome, casa, ano e estar vivo são obrigatórios para um bruxo!"
        });
    }

    const novoBruxo = {

        id : bruxos.length + 1,
        nome,
        casa : casa,
        ano : parseInt(ano),
        varinha : varinha || "Ainda não definida",
        mascote : mascote || "Ainda não definido",
        patrono : patrono || "Ainda não descoberto",
        especialidade : especialidade || "Ainda não descoberto",
        vivo : vivo

    }

    bruxos.push (novoBruxo);

    res.status(201).json({
        success : true,
        message : "Novo bruxo adicionado a Hogwarts!",
        data : novoBruxo
    });
});

app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});