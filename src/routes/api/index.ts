import { Router } from 'express';
import { authApiRouter } from './auth.route';
import { cartApiRouter } from './cart.route';
import { catApiRouter } from './cat.route';
import { foodApiRouter } from './food.route';
import { orderApiRouter } from './order.route';
import { paymentApiRouter } from './payment.route';

const apiRouter: Router = Router();

apiRouter.use(authApiRouter);
apiRouter.use(foodApiRouter);
apiRouter.use(catApiRouter);
apiRouter.use(orderApiRouter);
apiRouter.use(cartApiRouter);
apiRouter.use(paymentApiRouter);

export default apiRouter;
