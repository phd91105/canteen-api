import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../models/category.model';
import lodash from 'lodash';
import moment from 'moment';

async function getCatList(req: Request, res: Response): Promise<void> {
  req.session!.input = req.query;
  try {
    const catRepository = getRepository(Category);
    const categories = await catRepository
      .createQueryBuilder('category')
      .orderBy({
        'category.id': 'ASC',
      })
      .getMany();
    res.render('category/catList', {
      title: 'Category List',
      categories,
      _: lodash,
      moment: moment,
      session: req.session,
      alerts: req.session!.alert || [],
    });
  } catch (error) {
    res.render('category/catList', {
      title: 'Category List',
      categories: [],
      moment: moment,
      _: lodash,
      session: req.session,
      alerts: req.session!.alert || [],
    });
  }
}

async function renderAddCat(req: Request, res: Response): Promise<void> {
  res.render('category/catForm', {
    title: 'Add Category',
    category: undefined,
    _: lodash,
    action: '/cat/add',
    session: req.session,
    moment: moment,
    alerts: req.session!.alert || [],
  });
}

async function renderEditCat(req: Request, res: Response): Promise<void> {
  const catRepository = getRepository(Category);
  const category = await catRepository.findOne({ id: +req.params.id });
  res.render('category/catForm', {
    title: 'Edit Category',
    _: lodash,
    category,
    moment: moment,
    action: `/cat/${req.params.id}`,
    session: req.session,
    alerts: req.session!.alert || [],
  });
}

async function addCat(req: Request, res: Response): Promise<void> {
  req.session!.input = req.body;
  const catRepository = getRepository(Category);
  const reqCat = {
    name: req.body.name,
    details: req.body.details,
    image: req.file?.filename,
  };
  await catRepository.save(reqCat);
  res.redirect('/categories');
}

async function editCat(req: Request, res: Response): Promise<void> {
  req.session!.input = req.body;
  const catRepository = getRepository(Category);
  const reqCat = {
    name: req.body.name,
    details: req.body.details,
    ...(req.file?.filename ? { image: req.file?.filename } : {}),
  };
  await catRepository.update(+req.params.id, reqCat);
  res.redirect('/categories');
}

async function deleteCat(req: Request, res: Response): Promise<void> {
  const catRepository = getRepository(Category);
  await catRepository.update(+req.params.id, { deletedAt: new Date() });
  res.redirect('/categories');
}

export { getCatList, renderAddCat, renderEditCat, addCat, editCat, deleteCat };
