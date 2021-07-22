import { Request, Response, Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import apiRouter from './api';
import { authRouter } from './auth.route';
import { catRouter } from './cat.route';
import { foodRouter } from './food.route';
import { orderRouter } from './order.route';
import { sectionRouter } from './section.router';
import { userRouter } from './user.route';

const appRouter: Router = Router();

appRouter.use('/api', apiRouter);
appRouter.get('/chat', (_, res: Response): void => {
  res.render('chat', { layout: false });
  return;
});
appRouter.get('/comment/:id', (req: Request, res: Response): void => {
  res.render('comment', { layout: false, id: req.params.id });
  return;
});
appRouter.use(authRouter);
appRouter.use(authenticate, userRouter);
appRouter.use(authenticate, sectionRouter);
appRouter.use(authenticate, foodRouter);
appRouter.use(authenticate, catRouter);
appRouter.use(authenticate, orderRouter);
appRouter.all('*', (_, res: Response) =>
  res.render('error/error', {
    layout: false,
    code: 404,
    level: 'danger',
    title: 'Not Found.',
    message: 'Trang bạn yêu cầu không tồn tại, vui lòng thử lại',
  }),
);

export default appRouter;
