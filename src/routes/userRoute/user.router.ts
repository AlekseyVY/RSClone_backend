import { NextFunction, Request, Response } from 'express';
import getAll from './user.service';

const router = require('express').Router();

router.route('/mock').get(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAll();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).json('no users found.');
    }
  } catch (err) {
    next(err);
  }
});

router.route('/authSevice').get(async (_req: Request, res: Response, next: NextFunction) => {
  try {
      res.send(200).json({status: 'ok', token: 'test_token'});
  } catch (err) {
    next(err);
  }
});

export default router;
