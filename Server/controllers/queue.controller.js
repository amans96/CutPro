import prisma from '../prisma.js';

// ==========================================
// 1. JOIN THE QUEUE 
// ==========================================
export const joinQueue = async (req, res) => {
  try {
    const { shopId, customerName, customerPhone, serviceId, staffId, customerId } = req.body;

    // 1. Calculate the next queueNumber for this specific shop
    // We look for the person with the highest number and add 1.
    const lastInLine = await prisma.queueItem.findFirst({
      where: { shopId },
      orderBy: { queueNumber: 'desc' }
    });

    const nextQueueNumber = lastInLine ? lastInLine.queueNumber + 1 : 1;

    // 2. Create the QueueItem
    const newQueueItem = await prisma.queueItem.create({
      data: {
        shopId,
        customerName,
        customerPhone,
        serviceId,
        staffId,
        customerId,
        queueNumber: nextQueueNumber,
        // joinedAt is handled automatically by @default(now())
      }
    });

    res.status(201).json(newQueueItem);
  } catch (error) {
    console.error("JOIN QUEUE ERROR:", error);
    res.status(500).json({ error: 'Failed to join the queue' });
  }
};

// ==========================================
// 2. GET LIVE QUEUE FOR A SHOP
// ==========================================
export const getShopQueue = async (req, res) => {
  try {
    const { shopId } = req.params;

    // Fetch the queue, but only show active customers
    const liveQueue = await prisma.queueItem.findMany({
      where: { 
        shopId,
        status: { in: ['WAITING', 'CALLED', 'IN_SERVICE'] } 
      },
      orderBy: { queueNumber: 'asc' }, // Order by ticket number!
      include: {
        service: true, 
        staff: true,
        customer: true // Include registered customer data if they have an account
      }
    });

    res.status(200).json(liveQueue);
  } catch (error) {
    console.error("GET QUEUE ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch queue' });
  }
};

// ==========================================
// 3. UPDATE QUEUE STATUS & TIMESTAMPS
// ==========================================
export const updateQueueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // e.g., "CALLED", "IN_PROGRESS", "COMPLETED"

    // 1. Find the entry and check ownership
    const queueItem = await prisma.queueItem.findUnique({
      where: { id },
      include: { shop: true }
    });

    if (!queueItem) return res.status(404).json({ error: 'Queue item not found' });
    
    if (queueItem.shop.ownerId !== req.user.userId) {
      return res.status(403).json({ error: 'Unauthorized.' });
    }

    // 2. Automatically log the exact time based on the new status
    let updateData = { status };
    
    if (status === 'CALLED') updateData.calledAt = new Date();
    if (status === 'IN_PROGRESS') updateData.startedAt = new Date();
    if (status === 'COMPLETED') updateData.completedAt = new Date();

    // 3. Save the update
    const updatedEntry = await prisma.queueItem.update({
      where: { id },
      data: updateData
    });

    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error("UPDATE QUEUE ERROR:", error);
    res.status(500).json({ error: 'Failed to update queue status' });
  }
};