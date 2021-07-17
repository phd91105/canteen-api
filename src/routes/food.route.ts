import { Router } from 'express';
import {
  addFood,
  deleteFood,
  editFood,
  getFoodList,
  renderAddFood,
  renderEditFood,
} from '../controllers/food.controller';
import { roleBasedAccess } from '../middlewares/auth.middleware';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads/' });

const foodRouter: Router = Router();

foodRouter.get('/foods', roleBasedAccess, getFoodList);
foodRouter.get('/food/add', roleBasedAccess, renderAddFood);
foodRouter.get('/food/:id', roleBasedAccess, renderEditFood);
foodRouter.post('/food/add', upload.single('image'), roleBasedAccess, addFood);
foodRouter.post('/food/:id', upload.single('image'), roleBasedAccess, editFood);
foodRouter.get('/food/:id/delete', roleBasedAccess, deleteFood);

export { foodRouter };
