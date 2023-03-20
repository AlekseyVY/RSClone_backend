import { getMongoRepository } from 'typeorm';
import Character from '../../entity/character';
import { ICharacter } from '../../model/Character';

export const createCharacter = async (user: ICharacter) => {
  const characterRepository = getMongoRepository(Character);
  await characterRepository.save(user);
};

export const getByUserId = async (userId: string): Promise<Character | null> => {
  const characterRepository = getMongoRepository(Character);
  return characterRepository.findOne({
    where: {
      id: userId,
    },
  });
};

