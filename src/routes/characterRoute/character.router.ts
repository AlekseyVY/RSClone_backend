import { NextFunction, Request, Response } from 'express';
import router from '../userRoute/user.router';
import Character, { ICharacter } from '../../model/Character';
import { createCharacter, getByUserId } from './character.memory.repository';

router.route('/saveCharacter').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const character: ICharacter = new Character(req.body);
    await createCharacter(character);
    res.status(200).send({ status: 'Ok' });
  } catch (err) {
    res.status(500).send({ status: 'Server Error' });
    next(err);
  }
});

router.route('/getCharacter').get(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getByUserId(req.body.userId);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ status: 'Server Error' });
    next(err);
  }
});

export default router;
