import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { 
  createService, 
  getShopServices, 
  updateService, // Add this
  deleteService  // Add this
} from '../controllers/service.controller.js';

const router = express.Router();

router.post('/', verifyToken, createService);
router.get('/:shopId', verifyToken, getShopServices);

// Add the Update and Delete routes:
router.put('/:id', verifyToken, updateService);
router.delete('/:id', verifyToken, deleteService);

export default router;