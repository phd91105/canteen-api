import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Cart } from '../../models/cart.model';
import { extractJWT } from '../../utils/jwt';

async function getCartList(req: Request, res: Response): Promise<Response> {
  const cartList = await getRepository(Cart)
    .createQueryBuilder('cart')
    .orderBy({
      'cart.createdAt': 'DESC',
    })
    .where({ userId: extractJWT(<string>req.headers!.authorization).uid })
    .getMany();
  return res.json(cartList).status(200);
}

async function addToCart(req: Request, res: Response): Promise<Response> {
  const { foodId, quantity } = req.body;
  const cart = await getRepository(Cart).save({
    foodId,
    quantity,
    userId: +extractJWT(<string>req.headers!.authorization).uid,
  });
  return res.json(cart).status(200);
}

async function updateCart(req: Request, res: Response): Promise<Response> {
  const { cartId, foodId, quantity } = req.body;
  const cart = await getRepository(Cart).update(cartId, {
    foodId,
    quantity,
  });
  return res.json(cart).status(200);
}

async function removeFromCart(req: Request, res: Response): Promise<Response> {
  const { id } = req.body;
  await getRepository(Cart).delete(id);
  return res.json({ message: 'Deleted cart item' }).status(200);
}

export { getCartList, addToCart, updateCart, removeFromCart };
