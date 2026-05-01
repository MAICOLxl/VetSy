import express from "express";
const app = express();
app.use(express.json());
app.use(cors());

import clienteRuta from "./endpoints/clienteRuta.js";
import animalRuta from "./endpoints/animalRuta.js";
import servicioRuta from "./endpoints/servicioRuta.js";
import usuarioRuta from "./endpoints/usuarioRuta.js";
import vacunaRuta from "./endpoints/vacunaRuta.js";
import historialRuta from "./endpoints/historialRuta.js";
import movimientoRuta from "./endpoints/movimientoRuta.js";
import aplicacionVacunaRuta from "./endpoints/aplicacionVacunaRuta.js";
import desparasitanteRuta from "./endpoints/desparasitanteRuta.js";
import productoRuta from "./endpoints/productoRuta.js";
import proveedorRuta from "./endpoints/proveedorRuta.js";
import cors from "cors";
app.use("/clientes", clienteRuta);
app.use("/animales", animalRuta);
app.use("/servicios", servicioRuta);
app.use("/usuarios", usuarioRuta   );
app.use("/vacunas", vacunaRuta);
app.use("/historial", historialRuta);
app.use("/movimientos", movimientoRuta);
app.use("/aplicacion-vacuna", aplicacionVacunaRuta);
app.use("/desparasitantes", desparasitanteRuta);
app.use("/productos", productoRuta);
app.use("/proveedores", proveedorRuta);



export default app;



