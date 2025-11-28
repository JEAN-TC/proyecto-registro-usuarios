import express from 'express';
import cors from 'cors'; // Importar cors
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

// Initialize the connection pool
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Pass the adapter to the PrismaClient constructor
const prisma = new PrismaClient({ adapter });

const app = express();
const port = process.env.PORT || 3001;

import authRoutes from './routes/auth';

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Default for Vite dev server
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('User service is running!');
});

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});