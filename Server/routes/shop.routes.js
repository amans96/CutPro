import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { createShop } from '../controllers/shop.controller.js';
import prisma from '../prisma.js';

const router = express.Router();

// 1. Create a new shop (Protected)
router.post('/', verifyToken, createShop);

// 2. Get all shops for the logged-in owner (Protected)
router.get('/my-shops', verifyToken, async (req, res) => {
  try {
    const shops = await prisma.shop.findMany({
      where: { ownerId: req.user.userId }
    });
    res.status(200).json(shops);
  } catch (error) {
    console.error("FETCH SHOPS ERROR: ", error);
    res.status(500).json({ error: 'Failed to fetch shops' });
  }
});

export default router;