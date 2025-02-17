import { DataSource } from 'typeorm';
import { User } from 'users/users.entity';
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'dev',
  logging: false,
  entities: [User],
  // migrations: [],
  poolSize: 10, 
});

export const initializeDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    console.log('📌 Database initializing...');
    await AppDataSource.initialize();
    console.log('📌 Database Initialized!');
  }
};
