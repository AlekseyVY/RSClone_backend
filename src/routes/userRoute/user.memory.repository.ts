import { getMongoRepository } from 'typeorm';
import User from '../../entity/user';
import { IUser } from '../../model/User';

export const createUser = async (user: IUser) => {
  const userRepository = getMongoRepository(User);
  await userRepository.save(user);
};

export const getByLogin = async (userLogin: string): Promise<User | undefined> => {
  const userRepository = getMongoRepository(User);
  return userRepository.findOne({ login: userLogin });
};
