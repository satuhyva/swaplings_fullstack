import { Knex } from 'knex'


export async function closeDatabaseConnection(databaseConnection: Knex): Promise<void>  {
    return databaseConnection.destroy()
}