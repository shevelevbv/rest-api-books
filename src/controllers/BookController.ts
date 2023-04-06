import AppDataSource from '../connections/MongoConnection';
import Book from '../entities/Book';
import { IBook } from '../interfaces/IBook';
import { FastifyReply, FastifyRequest } from 'fastify';

interface IPostBody {
  title: string;
  author: string;
}
export default class BookController {
  getBooks = async (req: FastifyRequest, res: FastifyReply) => {
    const books: Array<Book> = await AppDataSource.getMongoRepository(Book).find();
    const allBooks = books.map(book => {
      return {
        id: book.id,
        title: book.title,
        author: book.author,
      }
    });
    res.code(200).send(allBooks);
  }

  addBook = async (req: FastifyRequest<{ Body: IPostBody }>, res: FastifyReply) => {
    const { title, author } = req.body;
    const newBook: Book = Book.create({
      title: title,
      author: author,
    });
    await AppDataSource.manager.save(newBook);
    res.code(200).send(newBook);
  }
}

