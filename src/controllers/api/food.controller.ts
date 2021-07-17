import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../../models/category.model';
import { Food } from '../../models/food.model';

async function getFoodList(req: Request, res: Response): Promise<Response> {
  const { cat_id } = req.query;
  const foods = await getRepository(Food)
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
    .where({
      ...(cat_id ? { catId: cat_id } : {}),
    })
    .getMany();
  return res.json(foods).status(200);
}

export { getFoodList };
