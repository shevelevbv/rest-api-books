import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';
import { DeleteWriteOpResultObject, InsertResult } from 'typeorm';

export default class UserService {
  static addUser = async (user: IUser): Promise<InsertResult> => UserRepository.addUser(user);

  static deleteUser = async (id: string): Promise<DeleteWriteOpResultObject> => UserRepository.deleteUser(id);
}