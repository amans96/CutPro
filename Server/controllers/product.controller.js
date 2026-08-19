import prisma from '../prisma.js';

// ==========================================
// 1. CREATE A PRODUCT
// ==========================================
export const createProduct = async (req, res) => {
  try {
    const { shopId, name, description, price, stock } = req.body;

    const shop = await prisma.shop.findUnique({ where: { id: shopId } });
    if (!shop || shop.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized.' });
    }

    const newProduct = await prisma.product.create({
      data: { shopId, name, description, price, stock }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// ==========================================
// 2. GET ALL PRODUCTS FOR A SHOP
// ==========================================
export const getShopProducts = async (req, res) => {
  try {
    const { shopId } = req.params;
    
    // Anyone with a valid token can view the shop's inventory
    const products = await prisma.product.findMany({
      where: { shopId },
      orderBy: { name: 'asc' }
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// ==========================================
// 3. UPDATE PRODUCT (Details or Stock Level)
// ==========================================
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { shop: true }
    });

    if (!product || product.shop.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized.' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price, stock }
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// ==========================================
// 4. DELETE A PRODUCT
// ==========================================
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { shop: true }
    });

    if (!product || product.shop.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized.' });
    }

    await prisma.product.delete({ where: { id } });

    res.status(200).json({ message: 'Product successfully deleted' });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};