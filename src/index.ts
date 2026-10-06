import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config, globalData } from './config/env';
import authRoutes from './routes/auth.routes';
import { initDb } from './config/db';
import { globalErrorHandler } from './middlewares/error.middleware';

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);

app.use(globalErrorHandler);

// Start server
const startServer = async () => {
  await initDb();
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
  });
};

startServer();
