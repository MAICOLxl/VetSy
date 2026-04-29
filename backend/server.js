const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// rutas
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

// servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});