import { Request, Response, NextFunction } from 'express';

const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Привет с бэка, фронту. Теперь без смс и регистраций!!!!!1111!!!!!ПЫЩЬ ПЫЩЬ');
    return;
  }
  next();
});

export default app;
