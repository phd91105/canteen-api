import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  public id: number;

  @CreateDateColumn({ name: 'createdAt', nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', nullable: false })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt', nullable: false })
  public deletedAt: Date;
}
