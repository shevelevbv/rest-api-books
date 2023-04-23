import { RouteShorthandOptionsWithHandler } from 'fastify';
import BookController from '../controllers/BookController';

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
      401: {
        type: 'object',
        properties: {
          statusCode: {type: 'number'},
          error: {type: 'string'},
          message: {type: 'string'},
        },
      },
      404: {
        properties: {
          message: { type: 'string'},
        },
      },
    },
  },
  handler: BookController.getBooks,
};

const postOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'author'],
      properties: {
        title: { type: 'string' },
        author: { type: 'string' },
      },
    },
    response: {
      201: {
        type: 'object',
        required: ['id', 'title', 'author'],
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          author: { type: 'string' },
        },
      },
      400: {
        type: 'object',
        properties: {
          error: { type: 'string'},
        },
      },
      401: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          error: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },
  handler: BookController.addBook,
};

async function bookRoutes (fastify: any, options: any, done: any) {

    fastify.get('/', {...getOpts, preValidation: fastify.authorization});

    fastify.post('/', {...postOpts, preValidation: fastify.authorization});

    done();
}

export { bookRoutes };
