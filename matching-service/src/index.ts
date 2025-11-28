import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3002;

import matchingRoutes from './routes/matching';

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Default for Vite dev server
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/matching', matchingRoutes); // Auth middleware is applied within matchingRoutes

app.get('/', (req, res) => {
  res.send('Matching service is running!');
});

app.listen(port, () => {
  console.log(`Matching service listening at http://localhost:${port}`);
});
