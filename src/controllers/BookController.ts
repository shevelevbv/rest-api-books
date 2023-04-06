import AppDataSource from '../connections/MongoConnection';
import Book from '../entities/Book';
import { IBook } from '../interfaces/IBook';

export default class BookController {
  async getBooks() {
    const bookRepository =  AppDataSource.getMongoRepository(Book);
    return await bookRepository.find();
  }

  async addBook(book: IBook) {
    await AppDataSource.manager.save(book);
  }
}

