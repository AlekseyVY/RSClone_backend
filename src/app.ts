import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import userRouter from './routes/userRoute/user.router';
import 'reflect-metadata';

require('dotenv').config();

const app = express();
const corsOptions = {
  origin:'*',
  credentials:true,
  optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Привет с бэка, фронту. Теперь без смс и регистраций!!!!!1111!!!!!ПЫЩЬ ПЫЩЬ');
    return;
  }
  next();
});

app.use('/users', userRouter);

export default app;
