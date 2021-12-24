import { NextFunction, Request, Response } from 'express';
import getAll from './user.service';
import User, { IUser } from '../../model/User';
import { createUser, getByLogin } from './user.memory.repository';

const uuid = require('uuid').v4;

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

router.route('/authService').post(async (_req: Request, res: Response, next: NextFunction) => {
  try {
    if (_req.body.login && _req.body.password) {
      let serviceStatus = await getByLogin(_req.body.login);
      if (serviceStatus) {
        res.send({ status: 'ok', token: `${serviceStatus.login}_login` });
      } else {
        const user: IUser = new User({
          id: uuid(), login: _req.body.login, password: _req.body.password
        });
        await createUser(user);
        serviceStatus = await getByLogin(_req.body.login);
        res.send({ status: 'ok', token: `${serviceStatus}_auth` });
      }
    } else {
      res.send({ status: 'Error', token: '' });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
