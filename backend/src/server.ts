import dotenv from "dotenv";
import { app } from "./app";
import {connectDB} from "./config/database";
dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});