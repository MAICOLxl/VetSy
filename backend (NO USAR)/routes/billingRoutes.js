// backend/routes/billingRoutes.js
import express from 'express';
import { getAll, getById, create, update, remove } from '../controllers/billingController.js';
const router = express.Router();

// Rutas CRUD para facturación
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
