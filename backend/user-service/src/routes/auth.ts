import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import prisma from '../prisma';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Register user
router.post('/register', async (req, res) => {
  console.log('DEBUG: Received register request with body:', req.body);
  const { email, password, name, bio, profilePictures } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        bio,
        profilePictures: profilePictures || [],
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  console.log('DEBUG: Received login request with body:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
