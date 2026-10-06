import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
  nodeEnv: process.env.NODE_ENV || 'development',
};

// Global variables (if needed)
export const globalData = {
  appName: 'Task17 News API',
  version: '1.0.0',
};
