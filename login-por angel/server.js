const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Rutas API
app.use("/api/clientes", require("./routes/clientes"));
app.use("/api/animales", require("./routes/animales"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/servicios", require("./routes/servicios"));
app.use("/api/auth", require("./routes/auth"));

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});