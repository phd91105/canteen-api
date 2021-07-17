import { Router, Response, Request } from 'express';
import {
  addUser,
  deleteUser,
  editUser,
  getUserList,
  renderAddUser,
  renderEditUser,
} from '../controllers/user.controller';
import { roleBasedAccess } from '../middlewares/auth.middleware';

const userRouter: Router = Router();

userRouter.get('/', (req: Request, res: Response) => {
  res.render('index', { session: req.session });
});
userRouter.get('/users', getUserList);
userRouter.get('/user/add', roleBasedAccess, renderAddUser);
userRouter.post('/user/add', roleBasedAccess, addUser);
userRouter.get('/user/:id', roleBasedAccess, renderEditUser);
userRouter.post('/user/:id', roleBasedAccess, editUser);
userRouter.get('/user/:id/delete', roleBasedAccess, deleteUser);

export { userRouter };
