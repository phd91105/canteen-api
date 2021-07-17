import { Request, Response } from 'express';
import { errorLog, infoLog } from '../utils/logger';
import { LoginDTO } from '../dto/login.dto';
import { validateSync } from 'class-validator';
import { User } from '../models/user.model';
import { getRepository } from 'typeorm';
import { transformError } from '../utils/validator';
import { Message } from '../constants';
import bcrypt from 'bcrypt';

async function login(req: Request, res: Response): Promise<void> {
  req.session!.input = req.body;
  const reqLogin = new LoginDTO(req.body);
  const validateError = validateSync(reqLogin);
  if (validateError.length > 0) {
    req.session!.alerts = {
      level: 'danger',
      messages: transformError(validateError),
    };
    res.redirect('back');
  } else {
    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isEmail = emailRegExp.test(reqLogin.user);
    const user = await getRepository(User).findOne({
      ...(isEmail ? { email: reqLogin.user } : { username: reqLogin.user }),
    });
    if (user && (await bcrypt.compare(reqLogin.password, user.password))) {
      req.session!.user = user;
      infoLog(req, 'login successful');
      res.redirect('/orders');
    } else {
      req.session!.alerts = {
        level: 'danger',
        messages: [Message.ERROR.ECL014],
      };
      errorLog(req, 'user not exist');
      res.redirect('back');
    }
  }
}

function renderLogin(req: Request, res: Response): void {
  res.render('auth/login', {
    layout: 'layout/authLayout',
    session: req.session,
  });
}

function logout(req: Request, res: Response): void {
  req.session?.destroy((err) => err && console.log(err));
  infoLog(req, 'logout successful');
  res.redirect('/login');
}

export { renderLogin, login, logout };
