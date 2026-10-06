import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AppError } from '../utils/AppError';

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  // Lấy Access Token từ HttpOnly Cookie
  const token = req.cookies.accessToken;

  if (!token) {
    throw new AppError('Truy cập bị từ chối. Vui lòng đăng nhập.', 401);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // Gắn thông tin user vào Request (đã được định nghĩa trong src/types/express.d.ts)
    req.user = decoded; 
    
    next();
  } catch (error) {
    throw new AppError('Phiên đăng nhập đã hết hạn hoặc không hợp lệ', 401);
  }
};
