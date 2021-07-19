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

async function login(req: Request, res: Response): Promise<void> {
  const reqLogin = new LoginDTO(req.body);
  const validateError = validateSync(reqLogin);
  if (validateError.length > 0) {
    res.json({ messages: transformError(validateError) });
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
      res.json({ message: 'Login successful', token }).status(200);
    } else {
      res.status(400);
      res.json({ error: 'Invalid email or password' });
    }
  }
}

async function register(req: Request, res: Response): Promise<void> {
  try {
    const user = await getRepository(User).save({
      ...req.body,
      joiningDate: new Date(),
      role: UserRole.USER,
      password: bcrypt.hashSync(req.body.password, 12),
    });
    res.json({ message: 'Registration success', user }).status(200);
  } catch (error) {
    res.status(400);
    res.json({ error: 'User already exist' });
  }
}

async function sendResetLink(req: Request, res: Response): Promise<void> {
  const { email } = req.body;
  const user = await getRepository(User).findOne({
    email: email,
  });
  try {
    const token = signJWT({ uid: user!.id }, '5m');
    sendMail(email, token);
    infoLog(req, `Send reset password link to email ${email}`);
    res.json({ success: true }).status(200);
  } catch (error) {
    res.status(400);
    res.json({ error: 'User is not exist' });
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
  } catch (error) {
    errorLog(req, error);
    res.status(400);
    res.send({ msg: 'Invalid token' });
  }
}

async function resetPassword(req: Request, res: Response): Promise<void> {
  const { token } = req.query;
  const decoded = extractJWT(<string>token);
  await getRepository(User).update(decoded.uid, {
    password: bcrypt.hashSync(req.body.password, 12),
  });
  infoLog(req, 'Reset password success');
  res.json({ message: 'Reset password success' }).status(200);
}

export { login, register, sendResetLink, resetPassword, renderResetPassword };
