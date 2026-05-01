// filepath: backend/server.js
import http from 'http';
import { pool } from '../configuracionDB/db.js';

// Configuración de la base de datos (ya no necesaria aquí)
// import dotenv from 'dotenv';
// dotenv.config();

// Función para manejar solicitudes HTTP
async function handleRequest(req, res) {
  const url = req.url.split('?')[0];
  const method = req.method;

  // Configurar headers CORS
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Rutas
  try {
    if (url === '/api/users' && method === 'GET') {
      const [rows] = await pool.query('SELECT * FROM users');
      res.writeHead(200);
      res.end(JSON.stringify(rows));
    } else if (url === '/api/pets' && method === 'GET') {
      const [rows] = await pool.query('SELECT * FROM pets');
      res.writeHead(200);
      res.end(JSON.stringify(rows));
    } else if (url === '/api/appointments' && method === 'GET') {
      const [rows] = await pool.query('SELECT * FROM appointments');
      res.writeHead(200);
      res.end(JSON.stringify(rows));
    } else if (url === '/api/billing' && method === 'GET') {
      const [rows] = await pool.query('SELECT * FROM billing');
      res.writeHead(200);
      res.end(JSON.stringify(rows));
    } else if (url === '/' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'API VetSy funcionando con MySQL' }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
}

// Crear servidor
const server = http.createServer(handleRequest);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export { pool };