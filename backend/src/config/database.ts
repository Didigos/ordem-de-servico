import mongoose from "mongoose";
mongoose.set("bufferCommands", false);

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI não definido");

  mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB conectado");
    console.log("DB:", mongoose.connection.name);
  });

  mongoose.connection.on("error", (err) => {
    console.log("❌ Erro MongoDB:", err);
  });

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000,
  });
}
