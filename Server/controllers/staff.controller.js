import prisma from '../prisma.js';

export const createStaff = async (req, res) => {
  try {
    const { shopId, name, email, phone, role } = req.body;

    // 1. Security Check: Does this shop belong to the logged-in user?
    const shop = await prisma.shop.findUnique({ where: { id: shopId } });
    
    if (!shop || shop.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized: You do not own this shop.' });
    }

    // 2. Create the Staff member
    const newStaff = await prisma.staff.create({
      data: {
        shopId,
        name,
        email,
        phone,
        role, // e.g., "BARBER", "HAIRSTYLIST", "MANAGER"
      }
    });

    res.status(201).json(newStaff);
  } catch (error) {
    console.error("CREATE STAFF ERROR:", error);
    res.status(500).json({ error: 'Failed to create staff member' });
  }
};

export const getShopStaff = async (req, res) => {
  try {
    const { shopId } = req.params;

    // Fetch all staff for this specific shop
    const staffList = await prisma.staff.findMany({
      where: { shopId }
    });

    res.status(200).json(staffList);
  } catch (error) {
    console.error("GET STAFF ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
};
// ==========================================
// UPDATE STAFF
// ==========================================
export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params; // The ID of the staff member
    const { name, email, phone, role, status, isActive } = req.body;

    // 1. Find the staff member and include the shop to check ownership
    const staff = await prisma.staff.findUnique({
      where: { id },
      include: { shop: true }
    });

    if (!staff) {
      return res.status(404).json({ error: 'Staff member not found' });
    }

    // 2. Security Check: Does the logged-in user own this shop?
    if (staff.shop.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized: You cannot edit this staff member.' });
    }

    // 3. Update the staff member
    const updatedStaff = await prisma.staff.update({
      where: { id },
      data: { name, email, phone, role, status, isActive }
    });

    res.status(200).json(updatedStaff);
  } catch (error) {
    console.error("UPDATE STAFF ERROR:", error);
    res.status(500).json({ error: 'Failed to update staff' });
  }
};


// ==========================================
// DELETE STAFF
// ==========================================
export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the staff member
    const staff = await prisma.staff.findUnique({
      where: { id },
      include: { shop: true }
    });

    if (!staff) {
      return res.status(404).json({ error: 'Staff member not found' });
    }

    // 2. Security Check
    if (staff.shop.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized: You cannot delete this staff member.' });
    }

    // 3. Delete the staff member
    await prisma.staff.delete({
      where: { id }
    });

    res.status(200).json({ message: 'Staff member successfully deleted' });
  } catch (error) {
    console.error("DELETE STAFF ERROR:", error);
    res.status(500).json({ error: 'Failed to delete staff' });
  }
};