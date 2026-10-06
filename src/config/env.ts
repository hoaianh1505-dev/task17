import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret_123',
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    name: process.env.DB_NAME || 'task17_db',
  }
};

// Global variables (if needed)
export const globalData = {
  appName: 'Task17 News API',
  version: '1.0.0',
};
