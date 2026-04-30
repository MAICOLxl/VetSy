const express    = require("express");
const cors       = require("cors");
const bodyParser = require("body-parser");
const path       = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

<<<<<<< HEAD
// Rutas
app.use("/api/clientes", require("./routes/clientes"));
app.use("/api/animales", require("./routes/animales"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/servicios", require("./routes/servicios"));
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
=======
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
>>>>>>> 4caf2fdfac870e2d5b428b206eda3d331401f099
