import BookRepository from '../repositories/BookRepository';
import { IBook } from '../interfaces/IBook';
import Book from '../entities/Book';

export default class BookService {
  static getBooks = async (): Promise<Array<IBook>> => BookRepository.getBooks();
  static addBook = async (book: Book): Promise<Book> => BookRepository.addBook(book);
}