import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { Server } from 'http';
import { Server as IoServer } from "socket.io";
import userRouter from './routes/userRoute/user.router';
import 'reflect-metadata';
import characterRouter from './routes/characterRoute/character.router';

const cors = require('cors');

dotenv.config();

const app = express();
const server = new Server(app);
export const io = new IoServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.options('*', cors());
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('А бэкенд то живой, ЖИВОЙ.');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/character', characterRouter);

export default server;
