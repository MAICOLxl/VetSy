import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir todos los archivos estáticos
app.use(express.static(__dirname));

// Ruta raíz → login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.listen(PORT, () => {
  console.log(`🐾 VetSy frontend corriendo en http://localhost:${PORT}`);
});
