import { Router } from 'express';
import { getRateList } from '../../controllers/api/rating.controller';
import { authenticate } from '../../middlewares/api.middleware';

const ratingApiRouter: Router = Router();

ratingApiRouter.get('/rating/:foodid', authenticate, getRateList);

export { ratingApiRouter };
