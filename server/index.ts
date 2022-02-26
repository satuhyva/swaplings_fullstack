// @ts-nocheck
import 'reflect-metadata'
import Fastify from 'fastify'
import fastifyCors from 'fastify-cors'
import { Database } from './database/Database'
import { Person } from './models/person'
import { Role } from './types/types'


const fastify = Fastify({
  logger: false //true
})

fastify.register(fastifyCors)


fastify.get('/ping', async (_request, reply) => {
  reply.send('pong')
})

fastify.get('/test-db-connection', async (_request, reply) => {
  if (process.env.NODE_ENV !== 'production') {
    const nonExistingPersons = await Person.query().whereNotNull('id')
    console.log(nonExistingPersons)
    reply.send(nonExistingPersons)
    // Kun tyhjä, palauttaa [], mutta ylipäätän kun toimii, ei tule erroria, vaan palauttaa jotain
  }
  reply.send('Not available in production mode')
})

// fastify.get('/test-database-functionality', async (_request, reply) => {
//   const uniqueStamp = new Date().toISOString()
//   const randomString = '' + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10))
//   try {  
//      const person = await Person.createPerson({
//       id: `0002f980-9${randomString}-11e9-a7c8-79c148412f79`,
//       username: 'test person' + uniqueStamp,
//       passwordhash: 'hash',
//       email: 'emailemail',
//       role: Role.GUEST,
//       deleted: false
//     })
//     const allPersons = await Person.getAllTesting()
//     reply.send({  person, allPersons })  
//   } catch (error) {
//     console.log(error)
//     reply.send(error)
//   }
// })

const start = async () => {
  console.log('NODE_ENV', process.env.NODE_ENV)
  try {
    Database.instance.connect()
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

    // "test:github": "env NODE_ENV=test ts-node-dev index.ts",

// git subtree push --prefix server heroku main
// heroku create swaplings-server --region eu
// docker build . -t server
// docker run -dp 3001:3001 server
