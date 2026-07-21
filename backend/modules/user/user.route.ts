import { Router } from 'express';
import * as userController from './user.controller.js';
import { requireAuth } from '../../middlewares/auth.js';

const router = Router();

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/me', requireAuth, userController.getMe);
router.get('/', userController.getAllUsers);

export default router;
