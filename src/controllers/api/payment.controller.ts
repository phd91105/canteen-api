import { VNPay } from 'vn-payments';
import { Request, Response } from 'express';
import dateFormat from 'dateformat';
import { Order } from '../../models/order.model';
import { getRepository } from 'typeorm';
import { OrderStatus } from '../../constants';
import 'dotenv/config';

const { VNP_MERCHANT, VNP_SECRET, VNP_RETURN } = process.env;

async function vnpayCheckout(req: Request, res: Response): Promise<void> {
  const { orderId } = req.params;
  let total;
  const order = await getRepository(Order).findOne(<string>orderId);
  if (order?.status === OrderStatus.WAITING) {
    order ? (total = order.total) : (total = 0);
    const vnpay = new VNPay({
      paymentGateway: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
      merchant: <string>VNP_MERCHANT,
      secureSecret: <string>VNP_SECRET,
    });
    const date = new Date();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkoutPayload: any = {
      createdDate: `${dateFormat(date, 'yyyymmddHHmmss')}`,
      amount: +total,
      clientIp: '127.0.0.1',
      locale: 'vn',
      currency: 'VND',
      orderId: `express-${dateFormat(date, 'HHmmss')}`,
      orderInfo: orderId,
      orderType: 'food',
      returnUrl: VNP_RETURN,
      transactionId: `express-${dateFormat('HHmmss')}`,
      customerId: 'customerId',
      bankCode: 'NCB',
    };
    const url = (await vnpay.buildCheckoutUrl(checkoutPayload)).toString();
    return res.redirect(url);
  } else {
    res.status(400);
    res.json({ message: 'Bad request' });
    return;
  }
}

async function vnpayCallback(req: Request, res: Response): Promise<void> {
  await getRepository(Order).update(+(<string>req.query.vnp_OrderInfo), {
    status: OrderStatus.PAID,
  });
  res.json({ message: 'Paid success' }).status(200);
}

export { vnpayCheckout, vnpayCallback };
