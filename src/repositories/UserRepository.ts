import IUser from '../interfaces/IUser';
import { DeleteWriteOpResultObject, InsertResult } from 'typeorm';
import AppDataSource from '../connections/MongoConnection';
import User from '../entities/User';

export default class UserRepository {
  static addUser = async (user: IUser): Promise<InsertResult> => AppDataSource.getRepository(User).insert(user);

  static deleteUser = async (id: string): Promise<DeleteWriteOpResultObject> => {
    const result = await AppDataSource.getMongoRepository(User).deleteOne({id});
    if (result.deletedCount === 0) {
      throw new Error("The user doesn't exist");
    }
    return result;
  }

}