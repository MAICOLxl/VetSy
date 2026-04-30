const express    = require("express");
const cors       = require("cors");
const bodyParser = require("body-parser");
const path       = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Sirve todos los archivos estáticos (HTML, CSS, JS, imágenes)
app.use(express.static(path.join(__dirname)));

// Rutas del API
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

// Ruta raíz → login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
