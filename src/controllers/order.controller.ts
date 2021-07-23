import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Order } from '../models/order.model';
import { User } from '../models/user.model';
import { OrderDetails } from '../models/orderDetails.model';
import lodash from 'lodash';
import moment from 'moment';
import { Food } from '../models/food.model';
import { OrderStatus } from '../constants';

async function getOrderList(req: Request, res: Response): Promise<void> {
  req.session!.input = req.query;
  try {
    const orderRepository = getRepository(Order);
    const orders = await orderRepository
      .createQueryBuilder('order')
      .leftJoinAndMapMany('order.user', User, 'user', 'order.userId = user.id')
      .orderBy({
        'order.id': 'DESC',
      })
      .getMany();
    res.render('order/orderList', {
      title: 'Order List',
      orders,
      _: lodash,
      moment: moment,
      session: req.session,
      alerts: req.session!.alert || [],
    });
  } catch (error) {
    res.render('order/orderList', {
      title: 'Order List',
      orders: [],
      moment: moment,
      _: lodash,
      session: req.session,
      alerts: req.session!.alert || [],
    });
  }
}

async function renderEditOrderDetails(
  req: Request,
  res: Response,
): Promise<void> {
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
  res.render('order/detailsList', {
    title: `Order Details #${req.params.id}`,
    _: lodash,
    orderItems,
    action: `/order/${req.params.id}`,
    session: req.session,
    alerts: req.session!.alert || [],
  });
}

async function updateOrderStatus(req: Request, res: Response): Promise<void> {
  await getRepository(Order).update(+req.params.id, {
    status: req.body.status,
  });
  res.redirect('/orders');
}

async function getSumByDay(req: Request, res: Response): Promise<void> {
  const orderRepository = getRepository(Order);
  const list1 = await orderRepository
    .createQueryBuilder('order')
    .select('order.createdAt', 'day')
    .where({
      status: OrderStatus.COMPLETED,
    })
    .groupBy('DAY(order.createdAt)')
    .getRawMany();
  const list2 = await orderRepository
    .createQueryBuilder('order')
    .select('SUM(order.total)', 'sum')
    .where({
      status: OrderStatus.COMPLETED,
    })
    .groupBy('DAY(order.createdAt)')
    .getRawMany();
  res.render('sales/salesList', {
    title: 'Sales by Day',
    list1,
    list2,
    _: lodash,
    moment: moment,
    session: req.session,
  });
}
export { getOrderList, renderEditOrderDetails, updateOrderStatus, getSumByDay };
