// filepath: backend/server.js

import express from 'express';
import userRoutes from './routes/userRoutes.js';
import petRoutes from './routes/petRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Rutas
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/appointments', appointmentRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API VetSy funcionando' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});