import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 } from 'uuid';
import BookService from '../services/BookService';
import { IBook } from '../interfaces/IBook';

interface IBookPostBody {
  title: string;
  author: string;
}

export default class BookController {

  static getBooks = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    try {
      const books: Array<IBook> = await BookService.getBooks();
      res.code(200).send(books);
    } catch (err) {
      res.code(404).send({message: 'Not found'});
    }
  }

  static addBook = async (req: FastifyRequest<{ Body: IBookPostBody }>, res: FastifyReply): Promise<void> => {
    const { title, author } = req.body;
    const book: IBook = {
      id: v4(),
      title,
      author,
    };

    try {
      await BookService.addBook(book);
      res.code(201).send(book);
    } catch (err) {
      res.code(400).send({ error: "Bad Request" });
    }
  };
};
