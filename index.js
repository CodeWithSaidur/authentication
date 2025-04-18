import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ConnectDB } from './db/db.js';
import { router } from './routes/user.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.BASE_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Database connection
ConnectDB();

// Routes
app.get('/', (req, res) => res.send('Hello from server'));
app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});