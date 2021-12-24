import express, { Request, Response, NextFunction } from 'express';
import userRouter from './routes/userRoute/user.router';

const cors = require('cors');

const app = express();

app.use(cors());
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
