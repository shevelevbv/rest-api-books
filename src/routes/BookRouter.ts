import fastify from 'fastify';
async function bookRoutes (fastify: any, options: any, done: any) {

    fastify.get('/', (req: any, res: any) => {
      res.send('Success');
    }); // controller method

    // fastify.post('/'); // another controller method

    // done();
}

export { bookRoutes };
