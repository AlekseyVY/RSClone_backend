import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute/user.router';
import 'reflect-metadata';
import characterRouter from './routes/characterRoute/character.router';

const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.options('*', cors());
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Привет с бэка, фронту. Теперь без смс и регистраций!!!!!1111!!!!!ПЫЩЬ ПЫЩЬ');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/character', characterRouter);

export default app;
