import Book from '../entities/Book';
import AppDataSource from '../connections/MongoConnection';
import { IBook } from '../interfaces/IBook';
import { InsertResult } from "typeorm";

export default class BookRepository {
  static getBooks = async (): Promise<Array<IBook>> => AppDataSource.getRepository(Book).find();

  static addBook = async (book: IBook): Promise<InsertResult> => AppDataSource.getRepository(Book).insert(book);
}
