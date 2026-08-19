import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { 
  joinQueue, 
  getShopQueue, 
  updateQueueStatus 
} from '../controllers/queue.controller.js';

const router = express.Router();

// Public routes (Customers scanning a QR code or viewing a TV display)
router.post('/join', joinQueue);
router.get('/:shopId', getShopQueue);

// Protected routes (Barber marking the haircut as started/completed)
router.put('/:id', verifyToken, updateQueueStatus);

export default router;