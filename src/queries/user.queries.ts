import { getRepository } from 'typeorm';
import { User } from '../models/User';

export const getUserByUsername = async (username: string) => {
  try {
    return await getRepository(User)
      .createQueryBuilder('user')
      .select('user')
      .addSelect('user.password')
      .where('user.username = :username AND user.isActive = TRUE', { username })
      .getOne();
  } catch (error: any) {
    console.log(error);
  }
};
