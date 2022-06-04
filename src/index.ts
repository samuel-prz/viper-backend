import dotenv from 'dotenv';
import express, { Application } from 'express';
import morgan from 'morgan'; // HTTP request logger middleware
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import { User } from './models/User';

const app: Application = express();

const entities = [
  User
];

// config vars
dotenv.config({ path: 'config.env' });
const {
  DB_USER: username,
  DB_PASS: password,
  DB: database,
  DB_HOST: dbHost,
  DB_PORT: dbPort,
  PORT: port = 8000
} = process.env;

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
app.use('/auth/', authRouter);
app.use('/api', userRouter);

app.use(morgan('dev'));

// Server listening
app.listen(port, async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: dbHost,
      port: Number(dbPort) | 5432,
      username,
      password,
      database,
      entities,
      logging: true,
      synchronize: true
    });
  } catch (error) {
    console.error(error);
    console.log('Error on db connection');
  }
  console.log('Server on port: ', port);
});
