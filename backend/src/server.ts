import dotenv from "dotenv";
import { app } from "./app";
import { connectDB } from "./config/database";

dotenv.config();

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado na porta: ${PORT}`);
});

// tenta conectar, mas não bloqueia o servidor
connectDB()
  .then(() => console.log("Banco conectado com sucesso ✅"))
  .catch((error) => console.log("Erro ao conectar ao banco de dados:", error));
