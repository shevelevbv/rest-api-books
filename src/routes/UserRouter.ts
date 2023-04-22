import UserController from '../controllers/UserController';
import { RouteShorthandOptionsWithHandler } from 'fastify';

const postOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    body: {
      type: 'object',
      required: ['username'],
      properties: {
        username: {type: 'string'},
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: {type: 'string'},
          username: {type: 'string'},
        },
      },
      400: {
        type: 'object',
        properties: {
          error: {type: 'string'},
        },
      },
    },
  },
  handler: UserController.addUser,
};

const deleteOpts: RouteShorthandOptionsWithHandler = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: {type: 'string'},
      },
    },
    response: {
      204: {
        type: 'object',
        properties: {
          message: {type: 'string'},
        },
      },
      404: {
        type: 'object',
        properties: {
          message: {type: 'string'},
        },
      },
    },
  },
  handler: UserController.deleteUser,
};

const userRoutes = async (fastify: any, options: any, done: any) => {
  fastify.post('/users', postOpts);

  fastify.delete('/users/:id', deleteOpts);

  done();
};

export { userRoutes };