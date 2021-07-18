import { Column, Entity } from 'typeorm';
import { Base } from './base.model';

@Entity({ name: 'cart' })
export class Cart extends Base {
  @Column({ name: 'userId', type: 'int' })
  public userId: number;

  @Column({ name: 'foodId', type: 'int' })
  public foodId: number;

  @Column({ name: 'quantity', type: 'int' })
  public quantity: number;
}
