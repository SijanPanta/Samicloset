import { Router } from 'express';
import * as subscriberController from './subscriber.controller.js';

const router = Router();

router.post('/', subscriberController.create);

export default router;
