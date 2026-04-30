import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import personaRoutes from "./src/routes/personaRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json({ limit: "1mb" }));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Route mounting
app.use("/api", personaRoutes);
app.use("/api", chatRoutes);

app.use("/",(_req,_res,next)=>{
  console.log(1);
  next()
})

// Error handling
app.use((error, _req, res, next) => {
  if (error instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON request body." });
  }
  return next(error);
});

app.listen(port, "", () => {
  console.log(`Persona chatbot API listening on http://[IP_ADDRESS]:${port}`);
});
