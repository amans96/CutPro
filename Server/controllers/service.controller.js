import prisma from '../prisma.js';

export const createService = async (req, res) => {
  try {
    const { shopId, name, description, price, duration } = req.body;

    // 1. Security Check: Does this shop belong to the logged-in user?
    const shop = await prisma.shop.findUnique({ where: { id: shopId } });
    
    if (!shop || shop.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized: You do not own this shop.' });
    }

    // 2. Create the Service
    const newService = await prisma.service.create({
      data: {
        shopId,
        name,
        description,
        price,
        duration, // in minutes
      }
    });

    res.status(201).json(newService);
  } catch (error) {
    console.error("CREATE SERVICE ERROR:", error);
    res.status(500).json({ error: 'Failed to create service' });
  }
};

export const getShopServices = async (req, res) => {
  try {
    const { shopId } = req.params;

    const servicesList = await prisma.service.findMany({
      where: { shopId }
    });

    res.status(200).json(servicesList);
  } catch (error) {
    console.error("GET SERVICES ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};
// ==========================================
// UPDATE SERVICE
// ==========================================
export const updateService = async (req, res) => {
  try {
    const { id } = req.params; // The ID of the service to update
    const { name, description, price, duration, isActive } = req.body;

    // 1. Find the service and include the shop to check ownership
    const service = await prisma.service.findUnique({
      where: { id },
      include: { shop: true }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // 2. Security Check: Does this shop belong to the logged-in user?
    if (service.shop.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized: You cannot edit this service.' });
    }

    // 3. Update the service
    const updatedService = await prisma.service.update({
      where: { id },
      data: { name, description, price, duration, isActive }
    });

    res.status(200).json(updatedService);
  } catch (error) {
    console.error("UPDATE SERVICE ERROR:", error);
    res.status(500).json({ error: 'Failed to update service' });
  }
};


// ==========================================
// DELETE SERVICE
// ==========================================
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the service
    const service = await prisma.service.findUnique({
      where: { id },
      include: { shop: true }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // 2. Security Check
    if (service.shop.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized: You cannot delete this service.' });
    }

    // 3. Delete the service
    await prisma.service.delete({
      where: { id }
    });

    res.status(200).json({ message: 'Service successfully deleted' });
  } catch (error) {
    console.error("DELETE SERVICE ERROR:", error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
};