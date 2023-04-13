import Book from '../entities/Book';
import AppDataSource from '../connections/MongoConnection';
import { IBook } from '../interfaces/IBook';

export default class BookRepository {
  static getBooks = async (): Promise<Array<IBook>> => AppDataSource.getMongoRepository(Book).find();

  static addBook = async (book: Book): Promise<Book> => AppDataSource.manager.save(book);
}
