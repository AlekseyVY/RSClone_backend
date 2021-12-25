import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
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

router.route('/authService').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!(req.body.login && req.body.password)) {
      res.status(400).send({ status: 'Error', token: '', message: 'All inputs required' });
    }
    const serviceStatus = await getByLogin(req.body.login);
    if (serviceStatus && await bcrypt.compare(req.body.password, <string>serviceStatus.password)) {
      res.send({
        status: 'logged',
        userId: serviceStatus.id,
        token: `${serviceStatus.login}_isAuth`,
        message: 'Successfully logged in',
      });
    } else if (!serviceStatus) {
      const saltRounds = 10;
      const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const user: IUser = new User({
        id: uuid(),
        login: req.body.login,
        password: encryptedPassword,
      });
      await createUser(user);
      res.send({
        status: 'authenticated',
        userId: user.id,
        token: `${user.login}_isAuth`,
        message: 'Successfully Authenticated',
      });
    } else {
      res.send({
        status: 'denied',
        userId: '',
        token: '',
        message: 'Wrong password',
      });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
