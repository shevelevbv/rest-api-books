import BookRepository from '../repositories/BookRepository';
import { IBook } from '../interfaces/IBook';
import { InsertResult } from "typeorm";

export default class BookService {
  static getBooks = async (): Promise<Array<IBook>> => BookRepository.getBooks();
  static  addBook = async (book: IBook): Promise<InsertResult> => BookRepository.addBook(book);
}
