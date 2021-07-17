import { Router } from 'express';
import { login, logout, renderLogin } from '../controllers/auth.controller';

const authRouter: Router = Router();

authRouter.get('/login', renderLogin);
authRouter.post('/login', login);
authRouter.get('/logout', logout);

export { authRouter };
