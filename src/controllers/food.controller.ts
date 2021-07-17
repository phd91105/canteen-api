import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../models/category.model';
import { Food } from '../models/food.model';
import lodash from 'lodash';
import moment from 'moment';

async function getFoodList(req: Request, res: Response): Promise<void> {
  req.session!.input = req.query;
  try {
    const foodRepository = getRepository(Food);
    const foods = await foodRepository
      .createQueryBuilder('food')
      .leftJoinAndMapMany(
        'food.category',
        Category,
        'category',
        'food.catId = category.id',
      )
      .orderBy({
        'food.name': 'ASC',
        'food.id': 'ASC',
      })
      .getMany();
    res.render('food/foodList', {
      title: 'Food List',
      foods,
      _: lodash,
      moment: moment,
      session: req.session,
      alerts: req.session!.alert || [],
    });
  } catch (error) {
    res.render('food/foodList', {
      title: 'Food List',
      foods: [],
      moment: moment,
      _: lodash,
      session: req.session,
      alerts: req.session!.alert || [],
    });
  }
}

async function renderAddFood(req: Request, res: Response): Promise<void> {
  const catRepository = getRepository(Category);
  const categories = await catRepository.find({ order: { name: 'ASC' } });
  res.render('food/foodForm', {
    title: 'Add Food',
    _: lodash,
    food: undefined,
    action: '/food/add',
    session: req.session,
    categories,
    moment: moment,
    alerts: req.session!.alert || [],
  });
}

async function renderEditFood(req: Request, res: Response): Promise<void> {
  const foodRepository = getRepository(Food);
  const catRepository = getRepository(Category);
  const categories = await catRepository.find({ order: { name: 'ASC' } });
  const food = await foodRepository
    .createQueryBuilder('food')
    .leftJoinAndMapOne(
      'food.category',
      Category,
      'category',
      'food.catId = category.id',
    )
    .where({ id: +req.params.id })
    .getOne();
  res.render('food/foodForm', {
    title: 'Edit Food',
    _: lodash,
    food,
    moment: moment,
    categories,
    action: `/food/${req.params.id}`,
    session: req.session,
    alerts: req.session!.alert || [],
  });
}

async function addFood(req: Request, res: Response): Promise<void> {
  req.session!.input = req.body;
  const foodRepository = getRepository(Food);
  const reqFood = {
    ...req.body,
    price: +req.body.price,
    catId: +req.body.catId,
    image: req.file?.filename,
  };
  await foodRepository.save(reqFood);
  res.redirect('/foods');
}

async function editFood(req: Request, res: Response): Promise<void> {
  req.session!.input = req.body;
  const foodRepository = getRepository(Food);
  const reqFood = {
    ...req.body,
    price: +req.body.price,
    catId: +req.body.catId,
    ...(req.file?.filename ? { image: req.file?.filename } : {}),
  };
  await foodRepository.update(+req.params.id, reqFood);
  res.redirect('/foods');
}

async function deleteFood(req: Request, res: Response): Promise<void> {
  const foodRepository = getRepository(Food);
  await foodRepository.update(+req.params.id, { deletedAt: new Date() });
  res.redirect('/foods');
}

export {
  getFoodList,
  renderAddFood,
  renderEditFood,
  addFood,
  deleteFood,
  editFood,
};
