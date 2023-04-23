import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { bookRoutes } from './routes/BookRouter';
import { userRoutes } from './routes/UserRouter';
import { ACCESS_KEY } from './utils/config';

export const server = fastify({logger: true});
server
  .register(fastifyJwt, {
    secret: ACCESS_KEY,
  })
  .register(bookRoutes)
  .register(userRoutes)
  .decorate('authorization', async (req: FastifyRequest, res: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch {
      res.code(401).send(new Error('Unauthorized operation'));
    }
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Started server at ${address}`);
});
