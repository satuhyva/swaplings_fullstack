import Fastify from 'fastify'
import fastifyCors from 'fastify-cors'

const fastify = Fastify({
  logger: true
})

fastify.register(fastifyCors)


fastify.get('/ping', async (request, reply) => {
  reply.send('pong')
})

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3001)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

// git subtree push --prefix server heroku main