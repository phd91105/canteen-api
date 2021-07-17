import { Column, Entity, OneToMany } from 'typeorm';
import { OrderStatus } from '../constants';
import { Base } from './base.model';
import { OrderDetails } from './orderDetails.model';

@Entity({ name: 'order' })
export class Order extends Base {
  @Column({ name: 'userId', type: 'tinyint', nullable: false })
  public userId: number;

  @Column({ name: 'tableId', type: 'tinyint', nullable: false })
  public tableId: number;

  @Column({ name: 'status', type: 'enum', enum: OrderStatus, nullable: false })
  public status: OrderStatus;

  @Column({
    name: 'total',
    type: 'decimal',
    nullable: false,
  })
  public total: number;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  public orderDetails: OrderDetails[];
}
