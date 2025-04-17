import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ConnectDB } from './db/db.js';

// import routes
import { router } from './routes/user.route.js';

dotenv.config({});

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

const PORT = process.env.PORT || 3000;

ConnectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/router', router);

app.get('/', (req, res) => {
  res.send('/api/v1/router');
});

app.listen(PORT, () => {
  console.log(`click http://localhost:${PORT}`);
});
