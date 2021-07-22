import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { FoodRating } from '../../models/rating';

async function getRateList(req: Request, res: Response): Promise<Response> {
  const { foodid } = req.params;
  const foodRating = await getRepository(FoodRating)
    .createQueryBuilder('food_rating')
    .where({ foodId: foodid })
    .getMany();
  return res.json(foodRating).status(200);
}

export { getRateList };
