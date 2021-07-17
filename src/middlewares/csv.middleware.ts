import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const upload = multer({
  dest: './',
  fileFilter: function (_req, file, cb) {
    if (!file.originalname.match(/\.csv$/)) {
      return cb(new Error('Invalid file!'));
    }
    cb(null, true);
  },
}).single('csv');

export const uploadFile = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    } else next();
  });
};
