import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 5555;

app.use(express.json());

if (!process.env.MONGO_URI) {
  console.log("Sem URI de conexão ao MongoDB no .env");
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Não foi possivel conectar ao banco de dados: ${error}`);
  });