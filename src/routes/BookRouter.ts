import { FastifyRequest, FastifyReply, RouteShorthandOptions, RouteShorthandOptionsWithHandler } from 'fastify';
import AppDataSource from '../connections/MongoConnection';
import Book from '../entities/Book';
import BookController from '../controllers/BookController';
import { IBook } from '../interfaces/IBook';

interface IPostBody {
  title: string;
  author: string;
}

const BookProps = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    author: { type: 'string' },
  }
};

const postOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: BookProps,
    response: {
      200: BookProps,
    },
  },
  handler: async (req: FastifyRequest<{ Body: IPostBody }>, res: FastifyReply) => {
    const { title, author } = req.body;
    const newBook: Book = Book.create({
      title: title,
      author: author,
    });
    await AppDataSource.manager.save(newBook);
    res.code(200).send(newBook);
  },
}
async function bookRoutes (fastify: any, options: any, done: any) {

    fastify.get('/', async (req: FastifyRequest, res: FastifyReply) => {
      const books = await AppDataSource.getMongoRepository(Book).find();
      res.code(200).send(books);
    });

    fastify.post('/', postOpts);

    done();
}

export { bookRoutes };
