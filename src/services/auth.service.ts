import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/db';
import { User } from '../entities/User';
import { AppError } from '../utils/AppError';
import { AuthInput } from '../validations/auth.validation';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.util';

export const registerUser = async (input: AuthInput) => {
  const { username, password } = input;
  const userRepository = AppDataSource.getRepository(User);
  const existingUser = await userRepository.findOneBy({ username });
  
  if (existingUser) {
    throw new AppError('Username already exists', 400);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  
  const newUser = userRepository.create({
    username,
    passwordHash,
  });

  await userRepository.save(newUser);

  return {
    id: newUser.id,
    username: newUser.username,
    role: newUser.role,
  };
};

export const loginUser = async (input: AuthInput) => {
  const { username, password } = input;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ username });
  
  if (!user) {
    throw new AppError('Invalid username or password', 401);
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new AppError('Invalid username or password', 401);
  }

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken, user: payload };
};

export const refreshTokenService = async (token: string) => {
  try {
    const decoded = verifyRefreshToken(token);
    
    const payload = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken };
  } catch (error) {
    throw new AppError('Refresh token không hợp lệ hoặc đã hết hạn', 401);
  }
};
