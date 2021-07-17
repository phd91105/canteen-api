import { Router } from 'express';
import { authApiRouter } from './auth.route';
import { catApiRouter } from './cat.route';
import { foodApiRouter } from './food.route';
import { orderApiRouter } from './order.route';

const apiRouter: Router = Router();

apiRouter.use(authApiRouter);
apiRouter.use(foodApiRouter);
apiRouter.use(catApiRouter);
apiRouter.use(orderApiRouter);

export default apiRouter;
