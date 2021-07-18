import { Router } from 'express';
import {
  vnpayCallback,
  vnpayCheckout,
} from '../../controllers/api/payment.controller';

const paymentApiRouter: Router = Router();

paymentApiRouter.get('/vnp/checkout/:orderId', vnpayCheckout);
paymentApiRouter.get('/vnp/return', vnpayCallback);

export { paymentApiRouter };
