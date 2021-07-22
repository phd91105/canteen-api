import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'food_rating' })
export class FoodRating {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  public id: number;

  @Column({ name: 'userName', type: 'nvarchar' })
  public userName: string;

  @Column({ name: 'foodId', type: 'int' })
  public foodId: number;

  @Column({ name: 'content', type: 'nvarchar' })
  public comment: string;

  @Column({ name: 'rate', type: 'enum', enum: [1, 2, 3, 4, 5] })
  public rating: number;
}
