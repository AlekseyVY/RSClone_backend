import connection from '../../config/server';
import Character from '../../entity/character';
import { ICharacter } from '../../model/Character';

export const createCharacter = async (user: ICharacter) => {
  const characterRepository = connection.getMongoRepository(Character);
  await characterRepository.save(user);
};

export const getByUserId = async (userId: string): Promise<Character | null> => {
  const characterRepository = connection.getMongoRepository(Character);
  return characterRepository.findOne({
    where: {
      id: userId,
    },
  });
};
