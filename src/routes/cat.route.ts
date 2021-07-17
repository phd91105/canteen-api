import { Router } from 'express';
import {
  addCat,
  deleteCat,
  editCat,
  getCatList,
  renderAddCat,
  renderEditCat,
} from '../controllers/cat.controller';
import { roleBasedAccess } from '../middlewares/auth.middleware';
import multer from 'multer';

const upload = multer({ dest: 'public/uploads/' });
const catRouter: Router = Router();

catRouter.get('/categories', roleBasedAccess, getCatList);
catRouter.get('/cat/add', roleBasedAccess, renderAddCat);
catRouter.get('/cat/:id', roleBasedAccess, renderEditCat);
catRouter.post('/cat/add', upload.single('image'), roleBasedAccess, addCat);
catRouter.post('/cat/:id', upload.single('image'), roleBasedAccess, editCat);
catRouter.get('/cat/:id/delete', roleBasedAccess, deleteCat);

export { catRouter };
