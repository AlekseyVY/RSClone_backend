import { getMongoRepository } from 'typeorm';
import Character from '../../entity/character';
import { ICharacter } from '../../model/Character';

export const createCharacter = async (user: ICharacter) => {
  const userRepository = getMongoRepository(Character);
  await userRepository.save(user);
};

export const getByUserId = async (userId: string): Promise<Character | undefined> => {
  const userRepository = getMongoRepository(Character);
  return userRepository.findOne(userId);
};
