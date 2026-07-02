import { Router } from 'express';
import * as productController from './product.controller.js';
const router = Router();
router.get('/', productController.list);
router.get('/:slug', productController.show);
router.post('/', productController.createPost);
export default router;
//# sourceMappingURL=product.route.js.map