// @ts-nocheck
import { expect } from 'chai'
import 'mocha'
import { Person } from '../../models/person'
import { clearDatabase } from '../helpers/clear-database'
import { v4 as uuidv4 } from 'uuid'
import { Role } from '../../types/types'
import { Database } from '../../database/Database'


let DATABASE
let DATABASE_CONNECTION


describe('DATABASE CONNECTION (SOME SIMPLE DIRECT QUERIES, NO API OR GRAPHQL INVOLVED)', async () => {

    before(async () => {
        DATABASE = Database.instance
        DATABASE.connect()
        DATABASE_CONNECTION = DATABASE.knex
    })


    beforeEach(async () => {
        await clearDatabase(DATABASE_CONNECTION)
    })
  

    it('Database can be connected', async () => {
        const nonExistingPersons = await Person.query()
        expect(nonExistingPersons.length).to.equal(0)
    })


    it('Person can be created', async () => {
        const id = uuidv4()
        const person = await Person.createPerson({
            id,
            username: 'test person' + id,
            passwordhash: 'somehashedpassword',
            email: 'email.email@gmail.com',
            role: Role.GUEST
        })
        const personsInDatabase = await Person.query()
        expect(personsInDatabase.length).to.equal(1)
        expect(person.id).to.equal(id)
        expect(person.deleted).to.equal(null)
    })


    after(async () => {
        await DATABASE.disconnect()
      })
  
})