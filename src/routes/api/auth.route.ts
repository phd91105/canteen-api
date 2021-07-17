import { Router } from 'express';
import {
  login,
  register,
  renderResetPassword,
  resetPassword,
  sendResetLink,
} from '../../controllers/api/auth.controller';

const authApiRouter: Router = Router();

authApiRouter.post('/login', login);
authApiRouter.post('/register', register);
authApiRouter.post('/password/send', sendResetLink);
authApiRouter.get('/password/reset', renderResetPassword);
authApiRouter.post('/password/reset', resetPassword);

export { authApiRouter };
