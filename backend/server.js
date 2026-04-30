const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/api/clientes", require("./routes/clientes"));
app.use("/api/animales", require("./routes/animales"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/servicios", require("./routes/servicios"));
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});