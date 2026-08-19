import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { 
  createStaff, 
  getShopStaff, 
  updateStaff, // Add this
  deleteStaff  // Add this
} from '../controllers/staff.controller.js';

const router = express.Router();

router.post('/', verifyToken, createStaff);
router.get('/:shopId', verifyToken, getShopStaff);

// Add the Update and Delete routes:
router.put('/:id', verifyToken, updateStaff);
router.delete('/:id', verifyToken, deleteStaff);

export default router;