import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { connectdb } from '../../config/db.config';
import { OrderStatus } from '../../constants';
import { Order } from '../../models/order.model';
import { OrderDetails } from '../../models/orderDetails.model';
import { User } from '../../models/user.model';
import { extractJWT } from '../../utils/jwt';

async function getOrderList(req: Request, res: Response): Promise<Response> {
  const orders = await getRepository(Order)
    .createQueryBuilder('order')
    .leftJoinAndMapMany('order.user', User, 'user', 'order.userId = user.id')
    .orderBy({
      'order.id': 'DESC',
    })
    .where({ userId: extractJWT(<string>req.headers!.authorization).uid })
    .getMany();
  return res.json(orders);
}

async function createOrder(req: Request, res: Response): Promise<Response> {
  const { orderDetails, tableId, total } = req.body;
  const orderDetailsArray = new Array<OrderDetails>();
  for (const index in orderDetails) {
    const newOrderDetails = new OrderDetails();
    newOrderDetails.foodId = orderDetails[index].foodId;
    newOrderDetails.quantity = orderDetails[index].quantity;
    orderDetailsArray.push(newOrderDetails);
    await (await connectdb).manager.save(newOrderDetails);
  }
  const order = new Order();
  order.userId = +extractJWT(<string>req.headers!.authorization).uid;
  order.tableId = +tableId;
  order.total = +total;
  order.status = OrderStatus.WAITING;
  order.orderDetails = orderDetailsArray;
  const createOrder = await (await connectdb).manager.save(order);
  return res.json(createOrder);
}

export { getOrderList, createOrder };
