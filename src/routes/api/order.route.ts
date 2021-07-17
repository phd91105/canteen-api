import { Router } from 'express';
import {
  createOrder,
  getOrderList,
} from '../../controllers/api/order.controller';
import { authenticate } from '../../middlewares/api.middleware';

const orderApiRouter: Router = Router();

orderApiRouter.get('/orders', authenticate, getOrderList);
orderApiRouter.post('/order', authenticate, createOrder);

export { orderApiRouter };
