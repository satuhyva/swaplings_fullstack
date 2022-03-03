import 'reflect-metadata'
import Fastify from 'fastify'
import fastifyCors from 'fastify-cors'

import { ServerState } from './types/types'
import { Person } from './models/person'
import { Role } from './types/types'






export default class Server {

    serverState: ServerState = 'NOT_RUNNING'


    constructor() {
        console.log('Starting to initialize SWAPLINGS server...')
    }


// https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js

    public async start() {
        this.serverState = 'STARTING'

        const fastify = Fastify({
            logger: false
          })
          
        fastify.register(fastifyCors)

        fastify.get('/ping', async (_request, reply) => {
            reply.send('pong')
        })
          
        fastify.get('/test-db-connection', async (_request, reply) => {
              try {
                const nonExistingPersons = await Person.query().whereNotNull('id')
                reply.send(nonExistingPersons)
              } catch (error) {
                console.log(error)
                reply.send(error)
              }
        })
          
        fastify.get('/test-database-functionality', async (_request, reply) => {
            const uniqueStamp = new Date().toISOString()
            const randomString = '' + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10)) + Math.floor((Math.random() * 10))
            try {  
               const person = await Person.createPerson({
                id: `0002f980-9${randomString}-11e9-a7c8-79c148412f79`,
                username: 'test person' + uniqueStamp,
                passwordhash: 'hash',
                email: 'emailemail',
                role: Role.GUEST,
                deleted: false
              })
              // const allPersons = await Person.getAllTesting()
              const allPersons = await Person.query()
              reply.send({  person, allPersons })  
            } catch (error) {
              console.log(error)
              reply.send(error)
            }
        })

        try {
            const PORT = process.env.PORT || 3001
            const HOST = process.env.HOST || '0.0.0.0'
            await fastify.listen(PORT, HOST, () => { 
                console.log('SWAPLINGS server is running on PORT: ', process.env.PORT || 3001)
              })
          } catch (error) {
            console.log('Error starting SWAPLINGS server!!!', error)
            process.exit(1)
          }

        this.serverState = 'RUNNING'

    }

}