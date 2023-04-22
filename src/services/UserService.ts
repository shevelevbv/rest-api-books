import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';
import { DeleteResult, InsertResult } from 'typeorm';

export default class UserService {
  static addUser = async (user: IUser): Promise<InsertResult> => UserRepository.addUser(user);

  static deleteUser = async (id: string): Promise<DeleteResult> => UserRepository.deleteUser(id);
}