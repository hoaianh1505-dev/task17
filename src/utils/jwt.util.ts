import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export interface TokenPayload {
  id: number;
  username: string;
  role: string;
}

export const generateAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' }); // Access token sống 15 phút
};

export const generateRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '7d' }); // Refresh token sống 7 ngày
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwtRefreshSecret) as TokenPayload;
};
