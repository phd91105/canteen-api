import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { connectdb } from '../../config/db.config';
import { OrderStatus } from '../../constants';
import { Cart } from '../../models/cart.model';
import { Food } from '../../models/food.model';
import { Order } from '../../models/order.model';
import { OrderDetails } from '../../models/orderDetails.model';
import { extractJWT } from '../../utils/jwt';

async function getOrderList(req: Request, res: Response): Promise<Response> {
  const orders = await getRepository(Order)
    .createQueryBuilder('order')
    .orderBy({
      'order.createdAt': 'DESC',
    })
    .where({ userId: extractJWT(<string>req.headers!.authorization).uid })
    .getMany();
  return res.json(orders).status(200);
}

async function getOrderDetails(req: Request, res: Response): Promise<void> {
  const orderRepository = getRepository(Order);
  const orderItems = await orderRepository
    .createQueryBuilder('order')
    .leftJoinAndMapMany(
      'order.order_details',
      OrderDetails,
      'order_details',
      'order.id = order_details.orderId',
    )
    .leftJoinAndMapOne(
      'order_details.food',
      Food,
      'food',
      'order_details.foodId = food.id',
    )
    .where({ id: +req.params.id })
    .getOne();
  res.json(orderItems).status(200);
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
  await getRepository(Cart)
    .createQueryBuilder()
    .delete()
    .from(Cart)
    .where({ userId: extractJWT(<string>req.headers!.authorization).uid })
    .execute();
  return res.json(createOrder).status(200);
}

export { getOrderList, createOrder, getOrderDetails };
