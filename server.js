import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5555;

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
        console.log(`Não foi possível conectar ao banco de dados: ${error}`);
    });
