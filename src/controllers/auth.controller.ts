import { Request, Response } from 'express';
import { registerUser, loginUser, refreshTokenService } from '../services/auth.service';
import { authSchema } from '../validations/auth.validation';

export const register = async (req: Request, res: Response) => {
  const input = authSchema.parse(req.body);
  const data = await registerUser(input);
  res.status(201).json({ message: 'User registered successfully', data });
};

export const login = async (req: Request, res: Response) => {
  const input = authSchema.parse(req.body);
  const data = await loginUser(input);
  
  res.cookie('accessToken', data.accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
  res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

  res.json({ message: 'Login successful', user: data.user });
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ success: false, error: 'Không tìm thấy Refresh Token trong Cookie' });
  }

  const data = await refreshTokenService(token);
  
  res.cookie('accessToken', data.accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
  res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

  res.json({ message: 'Token refreshed successfully' });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logout successful' });
};
