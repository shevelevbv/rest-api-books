import AppDataSource from '../connections/MongoConnection';
import Book from '../entities/Book';
import { IBook } from '../interfaces/IBook';
import { FastifyReply, FastifyRequest } from 'fastify';

interface IPostBody {
  title: string;
  author: string;
}
export default class BookController {

  getBooks = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    try {
      const books: Array<Book> = await AppDataSource.getMongoRepository(Book).find();
      const allBooks: Array<IBook> = books.map(book => {
        return {
          id: book.id,
          title: book.title,
          author: book.author,
        }
      });
      res.code(200).send(allBooks);
    } catch (err) {
      res.code(404).send({message: 'Not found'});
    }
  }

  addBook = async (req: FastifyRequest<{ Body: IPostBody }>, res: FastifyReply): Promise<void> => {
    try {
      const { title, author }: IPostBody = req.body;
      const newBook: Book = Book.create({
        title: title,
        author: author,
      });
      await AppDataSource.manager.save(newBook);
      const newBookCreated: IBook = {
        id: newBook.id,
        title: newBook.title,
        author: newBook.author,
      }
      res.code(201).send(newBookCreated);
    } catch (err) {
      res.code(404).send({message: 'Not found'});
    }
  }
}

