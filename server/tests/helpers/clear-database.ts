import { Knex } from 'knex'



export async function clearDatabase(databaseConnection: Knex) {

    await databaseConnection.raw(`
        DELETE FROM "Persons";
    `)

}