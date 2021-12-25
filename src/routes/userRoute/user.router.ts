import { NextFunction, Request, Response } from 'express';
import getAll from './user.service';
import User, { IUser } from '../../model/User';
import { createUser, getByLogin } from './user.memory.repository';
import bcrypt from 'bcrypt';

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
    if(!(_req.body.login && _req.body.password)) {
      res.status(400).send({status: 'Error', token: '', message: 'All inputs required'});
    }
    let serviceStatus = await getByLogin(_req.body.login);
    if(serviceStatus && await bcrypt.compare(_req.body.password, <string>serviceStatus.password)) {
      res.send({ status: 'logged', userId: serviceStatus.id, token: `${serviceStatus.login}_isAuth` });
    } else {
      const saltRounds = 10;
      const encryptedPassword = await bcrypt.hash(_req.body.password, saltRounds);
      const user: IUser = new User({
        id: uuid(),
        login: _req.body.login,
        password: encryptedPassword,
      });
      await createUser(user);
      res.send({ status: 'authenticated', userId: user.id, token: `${user.login}_isAuth` });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
