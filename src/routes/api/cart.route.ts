import { Router } from 'express';
import {
  addToCart,
  getCartList,
  removeFromCart,
  resetCart,
  updateCart,
} from '../../controllers/api/cart.controller';
import { authenticate } from '../../middlewares/api.middleware';

const cartApiRouter: Router = Router();

cartApiRouter.get('/cart', authenticate, getCartList);
cartApiRouter.post('/cart', authenticate, addToCart);
cartApiRouter.patch('/cart', authenticate, updateCart);
cartApiRouter.delete('/cart', authenticate, removeFromCart);
cartApiRouter.delete('/cart/reset', authenticate, resetCart);

export { cartApiRouter };
