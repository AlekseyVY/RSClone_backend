import { NextFunction, Request, Response } from 'express';
import router from '../userRoute/user.router';

router.route('/saveCharacter').post(async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ status: 'Ok' });
  } catch (err) {
    next(err);
  }
});

export default router;
