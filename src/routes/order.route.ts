import { Router } from 'express';
import {
  getOrderList,
  renderEditOrderDetails,
  updateOrderStatus,
} from '../controllers/order.controller';
import { roleBasedAccess } from '../middlewares/auth.middleware';

const orderRouter: Router = Router();

orderRouter.get('/orders', roleBasedAccess, getOrderList);
orderRouter.get('/order/:id', roleBasedAccess, renderEditOrderDetails);
orderRouter.post('/order/:id', roleBasedAccess, updateOrderStatus);

export { orderRouter };
