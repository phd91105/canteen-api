import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Category } from '../../models/category.model';

async function getCatList(req: Request, res: Response): Promise<Response> {
  const cats = await getRepository(Category)
    .createQueryBuilder('category')
    .getMany();
  return res.json(cats).status(200);
}

export { getCatList };
