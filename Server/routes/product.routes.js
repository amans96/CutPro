import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { 
  createProduct, 
  getShopProducts, 
  updateProduct, 
  deleteProduct 
} from '../controllers/product.controller.js';

const router = express.Router();

// All inventory routes are protected - only shop owners/staff should manage stock
router.post('/', verifyToken, createProduct);
router.get('/:shopId', verifyToken, getShopProducts);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;