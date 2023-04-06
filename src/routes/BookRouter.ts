import { RouteShorthandOptionsWithHandler } from 'fastify';
import BookController from '../controllers/BookController';

const bookController = new BookController();

const BookProps = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    author: { type: 'string' },
  }
};

const getOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            author: { type: 'string' },
          },
        },
      },
    },
  },
  handler: bookController.getBooks,
};

const postOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: BookProps,
    response: {
      200: BookProps,
    },
  },
  handler: bookController.addBook,
};

async function bookRoutes (fastify: any, options: any, done: any) {

    fastify.get('/', getOpts);

    fastify.post('/', postOpts);

    done();
}

export { bookRoutes };
