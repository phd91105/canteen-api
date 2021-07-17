import { Column, Entity } from 'typeorm';
import { Base } from './base.model';

@Entity({ name: 'section' })
export class Section extends Base {
  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  public name: string;

  @Column({ name: 'remarks', type: 'text', nullable: true })
  public remarks: string;

  @Column({ name: 'leaderId', type: 'bigint', nullable: false })
  public leaderId: number;

  @Column({ name: 'floorNum', type: 'int', nullable: false })
  public floorNum: number;
}
