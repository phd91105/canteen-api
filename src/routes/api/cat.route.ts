import { Router } from 'express';
import { getCatList } from '../../controllers/api/cat.controller';
import { authenticate } from '../../middlewares/api.middleware';

const catApiRouter: Router = Router();

catApiRouter.get('/categories', authenticate, getCatList);

export { catApiRouter };
