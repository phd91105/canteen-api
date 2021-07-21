import { Request, Response } from 'express';
import { getRepository, ILike } from 'typeorm';
import { Food } from '../../models/food.model';

async function getFoodList(req: Request, res: Response): Promise<Response> {
  const { catid, foodname } = req.query;
  const foods = await getRepository(Food)
    .createQueryBuilder('food')
    .orderBy({
      'food.createdAt': 'DESC',
    })
    .where({
      ...(catid ? { catId: catid } : {}),
      ...(foodname ? { name: ILike(`%${foodname}%`) } : {}),
    })
    .getMany();
  return res.json(foods).status(200);
}

export { getFoodList };
