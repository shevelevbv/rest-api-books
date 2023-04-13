import { FastifyReply, FastifyRequest } from 'fastify';
import Book from '../entities/Book';
import BookService from '../services/BookService';
import { IBook } from '../interfaces/IBook';

export default class BookController {

  static getBooks = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    try {
      const books: Array<IBook> = await BookService.getBooks();
      res.code(200).send(books);
    } catch (err) {
      res.code(404).send({message: 'Not found'});
    }
  }

  static addBook = async (req: FastifyRequest<{ Body: IBook }>, res: FastifyReply): Promise<void> => {
    try {
      const { title, author }: IBook = req.body;
      const newBook: Book = Book.create({ title, author });
      const addedBook: Book = await BookService.addBook(newBook);
      res.code(201).send(addedBook);
    } catch (err) {
      res.code(404).send({message: 'Not found'});
    }
  }
}

