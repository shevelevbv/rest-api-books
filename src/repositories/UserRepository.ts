import IUser from '../interfaces/IUser';
import { DeleteResult, InsertResult } from 'typeorm';
import AppDataSource from '../connections/MongoConnection';
import User from '../entities/User';

export default class UserRepository {
  static addUser = async (user: IUser): Promise<InsertResult> => AppDataSource.getRepository(User).insert(user);

  static deleteUser = async (id: string): Promise<DeleteResult> => AppDataSource.getRepository(User).delete({id});
}