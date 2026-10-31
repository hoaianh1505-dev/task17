import { Router } from 'express';
import { uploadFile, deleteFile, getFiles } from '../controllers/file.controller';
import { upload } from '../middlewares/upload.middleware';
import { verifyAuth } from '../middlewares/auth.middleware';

const router = Router();

// Yêu cầu đăng nhập mới được phép thao tác
router.get('/', verifyAuth, getFiles);
router.post('/upload', verifyAuth, upload.single('image'), uploadFile);
router.delete('/:filename', verifyAuth, deleteFile);

export default router;
