import { Connection, createConnection } from 'typeorm';
import { Section } from '../models/section.model';
import { User } from '../models/user.model';
import { Category } from '../models/category.model';
import { Food } from '../models/food.model';
import { OrderDetails } from '../models/orderDetails.model';
import { Order } from '../models/order.model';
import { Cart } from '../models/cart.model';
import 'dotenv/config';
import { FoodRating } from '../models/rating';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DATABASE_NAME } =
  process.env;
export const connectdb: Promise<Connection> = createConnection({
  type: 'mysql',
  host: DB_HOST,
  port: +(<string>DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [
    User,
    Section,
    Food,
    Category,
    Order,
    OrderDetails,
    Cart,
    FoodRating,
  ],
});
