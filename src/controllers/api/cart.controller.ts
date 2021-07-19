import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Cart } from '../../models/cart.model';
import { Food } from '../../models/food.model';
import { extractJWT } from '../../utils/jwt';

async function getCartList(req: Request, res: Response): Promise<Response> {
  const cartList = await getRepository(Cart)
    .createQueryBuilder('cart')
    .leftJoinAndMapOne('cart.food', Food, 'food', 'cart.foodId = food.id')
    .orderBy({
      'cart.createdAt': 'DESC',
    })
    .where({ userId: extractJWT(<string>req.headers!.authorization).uid })
    .getMany();
  return res.json(cartList).status(200);
}

async function addToCart(req: Request, res: Response): Promise<Response> {
  const { foodId, quantity } = req.body;
  const cart = await getRepository(Cart).findOne({
    foodId,
    userId: +extractJWT(<string>req.headers!.authorization).uid,
  });
  if (cart) {
    const updatedCart = await getRepository(Cart).update(cart.id, {
      quantity: cart.quantity + quantity,
    });
    return res.json(updatedCart).status(200);
  } else {
    const updatedCart = await getRepository(Cart).save({
      foodId,
      quantity,
      userId: +extractJWT(<string>req.headers!.authorization).uid,
    });
    return res.json(updatedCart).status(200);
  }
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

async function resetCart(req: Request, res: Response): Promise<Response> {
  await getRepository(Cart)
    .createQueryBuilder()
    .delete()
    .from(Cart)
    .where({ userId: extractJWT(<string>req.headers!.authorization).uid })
    .execute();
  return res.json({ message: 'Reset cart success' }).status(200);
}

export { getCartList, addToCart, updateCart, removeFromCart, resetCart };
