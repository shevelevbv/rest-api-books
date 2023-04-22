import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { bookRoutes } from './routes/BookRouter';
import { userRoutes } from './routes/UserRouter';

export const server = fastify({logger: true});
server.register(fastifyJwt, {
  secret: 'abc',
})
server.register(bookRoutes);
server.register(userRoutes);

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Started server at ${address}`);
});
