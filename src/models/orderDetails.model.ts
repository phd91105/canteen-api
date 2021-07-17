import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.model';
import { Order } from './order.model';

@Entity({ name: 'order_details' })
export class OrderDetails extends Base {
  @ManyToOne(() => Order, (order: Order) => order.id)
  public order: Order;

  @Column({ name: 'foodId' })
  public foodId: number;

  @Column({ name: 'quantity' })
  public quantity: number;
}
