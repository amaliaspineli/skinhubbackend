import express from "express";
import cors from "cors";
import cosmeticsRoutes from "./routes/cosmetics.js";

const app = express();
app.use(cors());
app.use(express.json());

// Prefixo da API local
app.use("/api/cosmetics", cosmeticsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
