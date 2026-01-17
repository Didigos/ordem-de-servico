import dotenv from "dotenv";
import { app } from "./app";
import { connectDB } from "./config/database";

dotenv.config();

const PORT = Number(process.env.PORT);

let dbReady = false;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor iniciado na porta: ${PORT}`);
});

connectDB()
  .then(() => {
    dbReady = true;
    console.log("Banco conectado ✅");
  })
  .catch((err) => console.log("Erro ao conectar ao banco:", err));

// middleware: bloqueia rotas que precisam de DB enquanto não conectou
app.use((req, res, next) => {
  // libera health e rota raiz
  if (req.path === "/health" || req.path === "/") return next();

  if (!dbReady) {
    return res.status(503).json({ message: "Banco conectando, tente novamente em instantes." });
  }

  next();
});
