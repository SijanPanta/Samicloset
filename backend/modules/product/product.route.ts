import { Router } from 'express';
import * as productController from './product.controller.js';
import { productSchema } from '../../schema/validation.js';
import { validateBody } from '../../middlewares/validate.js';
import { requireAdmin, requireAuth } from '../../middlewares/auth.js';

const router = Router();

router.get('/', productController.list);
router.get('/:slug', productController.show);
router.post(
  '/',
  requireAuth,
  requireAdmin,
  validateBody(productSchema),
  productController.createProduct,
);

export default router;
