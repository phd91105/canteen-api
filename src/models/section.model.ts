import { Column, Entity } from 'typeorm';
import { Base } from './base.model';

@Entity({ name: 'section' })
export class Section extends Base {
  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  public name: string;
}
