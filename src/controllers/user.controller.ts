import { Request, Response } from 'express';
import {
  Between,
  getRepository,
  ILike,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
import { User } from '../models/user.model';
import moment from 'moment';
import { Section } from '../models/section.model';
import lodash from 'lodash';
import { validateSync } from 'class-validator';
import bcrypt from 'bcrypt';
import { transformError } from '../utils/validator';
import { CreateUserDTO } from '../dto/create-user.dto';
import { EditUserDTO } from '../dto/edit-user.dto';
import { Message } from '../constants';
import { UpdatePasswordDTO } from '../dto/change-pass.dto';

async function getUserList(req: Request, res: Response): Promise<void> {
  const { name, joiningDateFrom, joiningDateTo } = req.query;
  req.session!.input = req.query;
  try {
    const userRepository = getRepository(User);
    const searchOption = {
      ...(name ? { name: ILike(`%${name}%`) } : {}),
      ...(req.query.userFlag ? { userFlag: In([req.query.userFlag]) } : {}),
      ...(joiningDateFrom && !joiningDateTo
        ? {
            joiningDate: MoreThanOrEqual(joiningDateFrom),
          }
        : !joiningDateFrom && joiningDateTo
        ? {
            joiningDate: LessThanOrEqual(joiningDateTo),
          }
        : joiningDateFrom && joiningDateTo
        ? {
            joiningDate: Between(joiningDateFrom, joiningDateTo),
          }
        : {}),
    };
    const users = await userRepository
      .createQueryBuilder('user')
      .leftJoinAndMapMany(
        'user.section',
        Section,
        'section',
        'user.sectionId = section.id',
      )
      .orderBy({
        'user.name': 'ASC',
        'user.id': 'ASC',
      })
      .where(searchOption)
      .getMany();
    res.render('user/userList', {
      title: 'User List',
      users,
      _: lodash,
      moment: moment,
      session: req.session,
      alerts: req.session!.alert || [],
    });
  } catch (error) {
    res.render('user/userList', {
      title: 'User List',
      users: [],
      moment: moment,
      _: lodash,
      session: req.session,
      alerts: req.session!.alert || [],
    });
  }
}

async function renderAddUser(req: Request, res: Response): Promise<void> {
  const sectionRepository = getRepository(Section);
  const sections = await sectionRepository.find({ order: { name: 'ASC' } });
  res.render('user/userForm', {
    title: 'User Register',
    _: lodash,
    user: undefined,
    action: '/user/add',
    session: req.session,
    sections,
    moment: moment,
    alerts: req.session!.alert || [],
  });
}

async function addUser(req: Request, res: Response): Promise<void> {
  req.session!.input = req.body;
  const userRepository = getRepository(User);
  const reqUser = {
    ...req.body,
    sectionId: +req.body.sectionId || null,
    userFlag: +req.body.userFlag,
  };
  const newUser = new CreateUserDTO(reqUser);
  const validateError = validateSync(newUser);
  if (validateError.length > 0) {
    req.session!.alert = transformError(validateError);
    res.redirect('back');
  } else {
    newUser.password = bcrypt.hashSync(newUser.password, 12);
    try {
      await userRepository.save(newUser);
      res.redirect('/users');
    } catch (error) {
      res.json(error);
    }
  }
}

async function renderEditUser(req: Request, res: Response): Promise<void> {
  const userRepository = getRepository(User);
  const sectionRepository = getRepository(Section);
  const sections = await sectionRepository.find({ order: { name: 'ASC' } });
  const user = await userRepository
    .createQueryBuilder('user')
    .leftJoinAndMapOne(
      'user.section',
      Section,
      'section',
      'user.sectionId = section.id',
    )
    .where({ id: +req.params.id })
    .getOne();
  res.render('user/userForm', {
    title: 'User Edit',
    _: lodash,
    user,
    moment: moment,
    sections,
    action: `/user/${req.params.id}`,
    session: req.session,
    alerts: req.session!.alert || [],
  });
}

async function editUser(req: Request, res: Response): Promise<void> {
  req.session!.input = req.body;
  const userRepository = getRepository(User);
  const reqUser = {
    ...req.body,
    sectionId: +req.body.sectionId || null,
    userFlag: +req.body.userFlag,
  };
  const user =
    req.session!.user.userFlag === 0
      ? new EditUserDTO(reqUser)
      : new UpdatePasswordDTO(reqUser);
  const validateError = validateSync(user);
  if (validateError.length > 0) {
    req.session!.alert = transformError(validateError);
    res.redirect('back');
  } else {
    if (user.password !== '') {
      user.password = bcrypt.hashSync(<string>user.password, 12);
    } else delete user.password;
    try {
      await userRepository.update(+req.params.id, user);
      res.redirect('/users');
    } catch (error) {
      res.json(error);
    }
  }
}

async function deleteUser(req: Request, res: Response): Promise<void> {
  if (req.session!.user.id == +req.params.id) {
    req.session!.alert = [{ level: 'danger', message: Message.ERROR.ECL019 }];
    res.redirect('/users');
  } else {
    const userRepository = getRepository(User);
    await userRepository.update(+req.params.id, { deletedAt: new Date() });
    res.redirect('/users');
  }
}

export {
  getUserList,
  renderAddUser,
  renderEditUser,
  addUser,
  editUser,
  deleteUser,
};
