import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { requireAuth, requireAdmin } from '../../middlewares/auth.js';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.resolve('uploads'));
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|avif/;
    const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimeOk = allowed.test(file.mimetype.split('/')[1]);
    if (extOk && mimeOk) return cb(null, true);
    cb(new Error('Only image files (jpeg, jpg, png, gif, webp, avif) are allowed'));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = Router();

router.post(
  '/',
  requireAuth,
  requireAdmin,
  (req: Request, res: Response, next) => {
    upload.single('image')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      }
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }
      const url = `/uploads/${req.file.filename}`;
      res.json({ url });
    });
  },
);

export default router;
