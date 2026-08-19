import prisma from '../prisma.js';

export const createShop = async (req, res) => {
  try {
    const { shopName, businessType, shopPhone, address, city, country } = req.body;
    
    // The middleware attached the user data to req.user!
    const ownerId = req.user.userId; 

    // Generate a URL-friendly slug (e.g., "John's Barbershop" -> "johns-barbershop-8472")
    const slug = shopName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 10000);

    const newShop = await prisma.shop.create({
      data: {
        ownerId,
        shopName,
        slug,
        businessType,
        shopPhone,
        address,
        city,
        country,
        // Optional defaults:
        isOpen: false, 
        subscriptionStatus: 'TRIAL', // Give them a trial on sign-up!
      }
    });

    res.status(201).json(newShop);
  } catch (error) {
    console.error("CREATE SHOP ERROR: ", error);
    res.status(500).json({ error: 'Failed to create shop' });
  }
};
// ==========================================
// UPDATE SHOP
// ==========================================
export const updateShop = async (req, res) => {
  try {
    const { id } = req.params;
    const { shopName, businessType, shopPhone, address, city, country, isOpen } = req.body;

    // 1. Find the shop
    const shop = await prisma.shop.findUnique({ where: { id } });

    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    // 2. Security Check: Are you the owner?
    if (shop.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized: You do not own this shop.' });
    }

    // 3. Update it
    const updatedShop = await prisma.shop.update({
      where: { id },
      data: { shopName, businessType, shopPhone, address, city, country, isOpen }
    });

    res.status(200).json(updatedShop);
  } catch (error) {
    console.error("UPDATE SHOP ERROR:", error);
    res.status(500).json({ error: 'Failed to update shop' });
  }
};

// ==========================================
// DELETE SHOP
// ==========================================
export const deleteShop = async (req, res) => {
  try {
    const { id } = req.params;

    const shop = await prisma.shop.findUnique({ where: { id } });

    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    if (shop.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized: You do not own this shop.' });
    }

    await prisma.shop.delete({ where: { id } });

    res.status(200).json({ message: 'Shop successfully deleted' });
  } catch (error) {
    console.error("DELETE SHOP ERROR:", error);
    res.status(500).json({ error: 'Failed to delete shop' });
  }
};