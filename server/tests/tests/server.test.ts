// @ts-nocheck
import { expect } from 'chai'
import 'mocha'
import axios from 'axios'
import { Person } from '../../models/person'
import { getDatabaseConnection } from '../helpers/get-database-connection'
import { clearDatabase } from '../helpers/clear-database'
import { closeDatabaseConnection } from '../helpers/close-database-connection'



const SERVER = process.env.NODE_ENV === 'deployment_test' ? 'server' 
: process.env.NODE_ENV === 'development_test' ? 
'localhost' 
: 'ERROR!'


describe('TESTING SERVER', async () => {
  
    it('Tests can be run', async () => {
        expect(true).to.equal(true)
    })

    it('A get request to route "/ping" returns a "pong"', async () => {
        const response = await axios.get(`http://${SERVER}:3001/ping`)
        expect(response.data).to.equal('pong')
    })

    it('Database connection works', async () => {
        const databaseConnection = getDatabaseConnection()
        await clearDatabase(databaseConnection)
        const personsBefore = await databaseConnection('Persons').whereNotNull('id')
        expect(personsBefore.length).to.equal(0)
        await databaseConnection('Persons').insert({
            id: '00004740-f4ce-11ea-9cea-3fe44cb70335', 
            username: 'username', 
            passwordhash: 'password', 
            email: 'email@gmail.com', 
            role: 'GUEST'
        })
        
        const personsAfter = await databaseConnection('Persons').whereNotNull('id')
        expect(personsAfter.length).to.equal(1)
        await closeDatabaseConnection(databaseConnection)
    })
  
})