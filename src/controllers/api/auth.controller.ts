import { Request, Response } from 'express';
import { errorLog, infoLog } from '../../utils/logger';
import { LoginDTO } from '../../dto/login.dto';
import { validateSync } from 'class-validator';
import { User } from '../../models/user.model';
import { getRepository } from 'typeorm';
import { transformError } from '../../utils/validator';
import bcrypt from 'bcrypt';
import { extractJWT, signJWT } from '../../utils/jwt';
import { sendMail } from '../../utils/mailer';
import { UserRole } from '../../constants';

async function login(req: Request, res: Response): Promise<Response> {
  const reqLogin = new LoginDTO(req.body);
  const validateError = validateSync(reqLogin);
  if (validateError.length > 0) {
    return res.json({ messages: transformError(validateError) });
  } else {
    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isEmail = emailRegExp.test(reqLogin.user);
    const user = await getRepository(User).findOne({
      ...(isEmail ? { email: reqLogin.user } : { username: reqLogin.user }),
    });
    if (user && (await bcrypt.compare(reqLogin.password, user.password))) {
      const token = signJWT(
        {
          uid: user.id,
          email: user.email,
          uname: user.name,
          role: user.userFlag,
        },
        '1d',
      );
      infoLog(req, 'Login successful');
      return res.json({ message: 'Login successful', token }).status(200);
    } else if (!user) {
      res.status(400);
      return res.json({ message: 'Invalid Username' });
    } else {
      res.status(400);
      return res.json({ message: 'Invalid Password' });
    }
  }
}

async function register(req: Request, res: Response): Promise<Response> {
  try {
    const user = await getRepository(User).save({
      ...req.body,
      joiningDate: new Date(),
      userFlag: UserRole.USER,
      password: bcrypt.hashSync(req.body.password, 12),
    });
    return res.json({ message: 'Registration success', user }).status(200);
  } catch (error) {
    res.status(400);
    return res.json({ message: 'User already exist' });
  }
}

async function sendResetLink(req: Request, res: Response): Promise<Response> {
  const { email } = req.body;
  const user = await getRepository(User).findOne({
    email: email,
  });
  try {
    const token = signJWT({ uid: user!.id }, '5m');
    sendMail(email, token);
    infoLog(req, `Send reset password link to email ${email}`);
    return res.json({ success: true }).status(200);
  } catch (error) {
    res.status(400);
    return res.json({ message: 'User is not exist' });
  }
}

function renderResetPassword(req: Request, res: Response): void {
  const { token } = req.query;
  try {
    extractJWT(<string>token);
    res.render('auth/resetPassword', {
      token: token,
      layout: 'layout/authLayout',
    });
    return;
  } catch (error) {
    errorLog(req, error);
    res.status(400);
    res.json({ message: 'Invalid token' });
    return;
  }
}

async function resetPassword(req: Request, res: Response): Promise<Response> {
  const { token } = req.query;
  const decoded = extractJWT(<string>token);
  await getRepository(User).update(decoded.uid, {
    password: bcrypt.hashSync(req.body.password, 12),
  });
  infoLog(req, 'Reset password success');
  return res.json({ message: 'Reset password success' }).status(200);
}

export { login, register, sendResetLink, resetPassword, renderResetPassword };
