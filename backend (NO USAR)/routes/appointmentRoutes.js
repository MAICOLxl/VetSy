// backend/routes/appointmentRoutes.js
import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/appointmentController.js';
const router = express.Router();

// Rutas CRUD para citas
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
