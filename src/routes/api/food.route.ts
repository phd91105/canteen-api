import { Router } from 'express';
import { getFoodList } from '../../controllers/api/food.controller';
import { authenticate } from '../../middlewares/api.middleware';

const foodApiRouter: Router = Router();

foodApiRouter.get('/foods', authenticate, getFoodList);

export { foodApiRouter };
