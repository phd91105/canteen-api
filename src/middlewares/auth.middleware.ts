import { Request, Response, NextFunction } from 'express';
import { errorLog } from '../utils/logger';

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.session!.user) {
    errorLog(req, 'unauthorized');
    res.redirect('/login');
    return;
  }
  next();
}

export const roleBasedAccess = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.session!.user.userFlag != 0) {
    errorLog(req, 'unauthorized');
    req.session!.alerts = {
      level: 'danger',
      messages: ['Access denied'],
    };
    res.redirect('/login');
    return;
  }
  next();
};
