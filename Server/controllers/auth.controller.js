

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js'; // Import the shared connection

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// ... the rest of your register and login code stays exactly the same!

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // 2. Secure the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save the new SaaS User
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 4. Generate an auth token
    const token = jwt.sign(
      { userId: user.id, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
} catch (error) {
    // Add this console.log so we can see what Prisma is complaining about!
    console.error("REGISTRATION ERROR: ", error); 
    
    res.status(500).json({ error: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find the user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 2. Verify the password matches
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // 3. Generate an auth token
    const token = jwt.sign(
      { userId: user.id, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(200).json({ 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
};