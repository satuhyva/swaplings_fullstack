import { expect } from 'chai'
import 'mocha'
import { Person } from '../../models/person'
import { clearDatabase } from '../helpers/clear-database'
import { v4 as uuidv4 } from 'uuid'
import { Role } from '../../types/types'
import { Database } from '../../database/Database'
import { Knex } from 'knex'

let DATABASE: Database
let DATABASE_CONNECTION: Knex

const TEST_PERSON_ID = uuidv4()
const TEST_PERSON = {
  id: TEST_PERSON_ID,
  username: 'test person' + TEST_PERSON_ID,
  passwordhash: 'somehashedpassword',
  email: 'email.email@gmail.com',
  role: Role.GUEST
}

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
    const person = await Person.createPerson({
      ...TEST_PERSON
    })
    const personsInDatabase = await Person.query()
    expect(personsInDatabase.length).to.equal(1)
    expect(person.id).to.equal(TEST_PERSON_ID)
    expect(person.deleted).to.equal(false)
  })

  after(async () => {
    await DATABASE.disconnect()
  })
})
