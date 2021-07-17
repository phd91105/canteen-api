import { Router } from 'express';
import { getSectionList, importCSV } from '../controllers/section.controller';
import { roleBasedAccess } from '../middlewares/auth.middleware';
import { uploadFile } from '../middlewares/csv.middleware';

const sectionRouter: Router = Router();

sectionRouter.get('/sections', roleBasedAccess, getSectionList);
sectionRouter.post('/section/import', uploadFile, roleBasedAccess, importCSV);

export { sectionRouter };
