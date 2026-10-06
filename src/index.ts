import express from 'express';
import cors from 'cors';
import { config, globalData } from './config/env';
import { sendSuccess } from './utils/response';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Basic route to test server and global/env variables
app.get('/', (req, res) => {
  sendSuccess(res, `Welcome to ${globalData.appName} v${globalData.version}`, {
    environment: config.nodeEnv
  });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
});
