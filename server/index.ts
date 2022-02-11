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
    const PORT = process.env.PORT || 3001
    const HOST = process.env.HOST || '0.0.0.0'
    await fastify.listen(PORT, HOST, () => { 
        console.log('Server is starting on PORT: ', process.env.PORT || 3001)
      })
  } catch (err) {
    console.log('Error starting my server!!!')
    
    console.log(err)
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

// git subtree push --prefix server heroku main
// heroku create swaplings-server --region eu