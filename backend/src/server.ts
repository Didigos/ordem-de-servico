import dotenv from "dotenv";
import { app } from "./app";
import { connectDB } from "./config/database";

dotenv.config();

const PORT = Number(process.env.PORT);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado na porta: ${PORT}`);
});

// conecta no banco sem bloquear
connectDB()
  .then(() => console.log("Banco conectado ✅"))
  .catch((error) => console.log("Erro ao conectar ao banco:", error));
