import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { AppError } from '../utils/AppError';

export const getFiles = (req: Request, res: Response) => {
  const uploadDir = path.join(process.cwd(), 'uploads');
  
  if (!fs.existsSync(uploadDir)) {
    return res.json({ success: true, files: [] });
  }

  const files = fs.readdirSync(uploadDir);
  const fileList = files.map(filename => ({
    filename,
    url: `/uploads/${filename}`
  }));

  res.json({ success: true, files: fileList });
};

export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError('Vui lòng chọn file để upload', 400);
  }

  const fileUrl = `/uploads/${req.file.filename}`;
  
  res.status(201).json({
    message: 'Upload file thành công',
    url: fileUrl,
    filename: req.file.filename
  });
};

export const deleteFile = (req: Request, res: Response) => {
  const filename = req.params.filename as string;
  const filePath = path.join(process.cwd(), 'uploads', filename);

  if (!fs.existsSync(filePath)) {
    throw new AppError('File không tồn tại hoặc đã bị xóa', 404);
  }

  try {
    fs.unlinkSync(filePath);
    res.json({ message: 'Xóa file thành công' });
  } catch (error) {
    throw new AppError('Có lỗi xảy ra khi xóa file', 500);
  }
};
