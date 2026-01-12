import dotenv from "dotenv";
import { app } from "./app";
import {connectDB} from "./config/database";
dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor iniciado na porta: ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
}) .catch((error) =>{
  console.log('Erro ao conectar ao banco de dados:', error);
})