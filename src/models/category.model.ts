import { Column, Entity } from 'typeorm';
import { Base } from './base.model';

@Entity({ name: 'category' })
export class Category extends Base {
  @Column({ name: 'name', type: 'nvarchar', nullable: false })
  public name: string;

  @Column({ name: 'details', type: 'nvarchar', nullable: true })
  public details: string;

  @Column({ name: 'image', type: 'varchar', nullable: true })
  public image: string;
}
