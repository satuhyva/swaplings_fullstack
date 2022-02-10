import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})


fastify.get('/ping', async (request, reply) => {
  reply.send('pong')
})

const start = async () => {
  try {
    await fastify.listen(3001)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()