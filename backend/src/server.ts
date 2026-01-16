import dotenv from "dotenv";
import { app } from "./app";
import { connectDB } from "./config/database";

dotenv.config();

// IMPORTANTE: alinhar com Railway (você expôs 3333)
const PORT = Number(process.env.PORT) || 3333;

// Suba o servidor primeiro
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado na porta: ${PORT}`);
});

// Conecta no banco sem travar o servidor
connectDB()
  .then(() => console.log("Banco conectado ✅"))
  .catch((error) => console.log("Erro ao conectar ao banco:", error));
