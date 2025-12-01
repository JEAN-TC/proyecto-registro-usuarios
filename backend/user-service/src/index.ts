import express from 'express';
import cors from 'cors'; // Importar cors
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

console.log('DEBUG: Starting user-service...');

// Initialize the connection pool
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Pass the adapter to the PrismaClient constructor
const prisma = new PrismaClient({ adapter });

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('DEBUG: Database connected successfully.');
  } catch (e) {
    console.error('ERROR: Database connection failed.', e);
    process.exit(1); // Exit if database connection fails
  }
}

connectToDatabase();

console.log('DEBUG: Prisma client initialized.');

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
  console.log('DEBUG: Request received for /');
  res.send('User service is running!');
});

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});