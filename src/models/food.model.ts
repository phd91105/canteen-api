import { Column, Entity } from 'typeorm';
import { Base } from './base.model';

@Entity({ name: 'food' })
export class Food extends Base {
  @Column({ name: 'name', type: 'nvarchar', nullable: false })
  public name: string;

  @Column({ name: 'details', type: 'nvarchar', nullable: true })
  public details: string;

  @Column({ name: 'price', type: 'bigint', nullable: false })
  public price: number;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  public image: string;

  @Column({ name: 'catId', type: 'int', nullable: true })
  public catId: number;
}
