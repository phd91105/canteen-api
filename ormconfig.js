require('dotenv/config');
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DATABASE_NAME } =
  process.env;
module.exports = {
  type: 'mysql',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/models/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
