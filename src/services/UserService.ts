import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';
import User from '../entities/User';
import { DeleteWriteOpResultObject, InsertResult } from 'typeorm';

export default class UserService {
  static addUser = async (user: IUser): Promise<InsertResult> => UserRepository.addUser(user);

  static findUser = async (id: string): Promise<User | null> => UserRepository.findUser(id);

  static deleteUser = async (id: string): Promise<DeleteWriteOpResultObject> => UserRepository.deleteUser(id);
}