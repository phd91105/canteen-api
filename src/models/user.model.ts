import { Column, Entity, Unique } from 'typeorm';
import { UserRole } from '../constants';
import { Base } from './base.model';

@Entity({ name: 'user' })
@Unique(['username'])
@Unique(['email'])
export class User extends Base {
  @Column({ name: 'username', type: 'varchar', nullable: false })
  public username: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  public password: string;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  public name: string;

  @Column({ name: 'sectionId', type: 'bigint', nullable: false })
  public sectionId: number;

  @Column({ name: 'joiningDate', type: 'date', nullable: false })
  public joiningDate: Date;

  @Column({ name: 'userFlag', type: 'enum', enum: UserRole, nullable: false })
  public userFlag: UserRole;
}
