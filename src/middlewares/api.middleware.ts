import { Request, Response, NextFunction } from 'express';
import { extractJWT } from '../utils/jwt';
import { errorLog } from '../utils/logger';

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.headers!.authorization) {
    errorLog(req, 'unauthorized');
    res.status(400).json({ message: 'Unauthorized' });
    return;
  } else {
    try {
      extractJWT(req.headers!.authorization);
    } catch {
      errorLog(req, 'unauthorized');
      res.status(400).json({ message: 'Unauthorized' });
      return;
    }
  }
  next();
}
