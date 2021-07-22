import { VNPay } from 'vn-payments';
import { Request, Response } from 'express';
import dateFormat from 'dateformat';
import { Order } from '../../models/order.model';
import { getRepository } from 'typeorm';
import { OrderStatus } from '../../constants';
import { extractJWT, signJWT } from '../../utils/jwt';
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
    const orderToken = signJWT({ orderId }, '10m');
    const date = new Date();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkoutPayload: any = {
      createdDate: `${dateFormat(date, 'yyyymmddHHmmss')}`,
      amount: +total,
      clientIp: '127.0.0.1',
      locale: 'vn',
      currency: 'VND',
      orderId: `express-${dateFormat(date, 'HHmmss')}`,
      orderInfo: orderToken,
      orderType: 'food',
      returnUrl: VNP_RETURN,
      transactionId: `express-${dateFormat('HHmmss')}`,
      customerId: `${order.userId}`,
      bankCode: 'NCB',
    };
    const url = (await vnpay.buildCheckoutUrl(checkoutPayload)).toString();
    return res.redirect(url);
  } else {
    res.status(400);
    // res.render('error/error', { layout: false, message: 'Bad request' });
    res.render('error/error', {
      layout: false,
      code: 400,
      level: 'danger',
      title: 'Bad Request.',
      message: 'Yêu cầu không hợp lệ !',
    });
    return;
  }
}

async function vnpayCallback(req: Request, res: Response): Promise<void> {
  const { vnp_OrderInfo, vnp_ResponseCode } = req.query as {
    [key: string]: string;
  };
  if (vnp_ResponseCode === '00') {
    try {
      await getRepository(Order).update(extractJWT(vnp_OrderInfo).orderId, {
        status: OrderStatus.PAID,
      });
      // res.json({ message: 'Paid success' }).status(200);
      res.render('error/error', {
        layout: false,
        code: 200,
        level: 'success',
        title: 'Success.',
        message: 'Đơn hàng đã được thanh toán thành công !',
      });
      return;
    } catch (error) {
      res.status(400);
      // return res.json({ message: 'Bad request' });
      res.render('error/error', {
        layout: false,
        code: 400,
        level: 'danger',
        title: 'Bad Request.',
        message: 'Yêu cầu không hợp lệ !',
      });
      return;
    }
  } else {
    res.render('error/error', {
      layout: false,
      code: 202,
      level: 'warning',
      title: 'Accepted.',
      message: 'Yêu cầu thanh toán đã được huỷ bỏ !',
    });
    return;
  }
  // return res.json({ message: 'Payment has been canceled' });
}

export { vnpayCheckout, vnpayCallback };
