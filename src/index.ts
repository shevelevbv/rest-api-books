import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { bookRoutes } from './routes/BookRouter';
import { userRoutes } from './routes/UserRouter';
import { ACCESS_KEY } from './utils/config';
import UserController from './controllers/UserController';

export const server = fastify({logger: true});
server
  .register(fastifyJwt, {
    secret: ACCESS_KEY,
  })
  .register(bookRoutes)
  .register(userRoutes)
  .decorate('authorization', async (req: FastifyRequest, res: FastifyReply) => {
    try {
      await UserController.checkUser(req);
    } catch {
      res.code(401).send({error: 'Access token is missing or invalid'});
    }
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Started server at ${address}`);
});
