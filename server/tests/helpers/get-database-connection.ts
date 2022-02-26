import { knex, Knex } from 'knex'


const TEST_DB_CONFIG = {
    acquireConnectionTimeout: 30000,
    client: 'postgresql',
    connection: process.env.DATABASE_URL || 
        {
            host: process.env.NODE_ENV === 'deployment_test' 
                ? 'postgres' 
                : process.env.NODE_ENV === 'development' ?
                'localhost' 
                : process.env.NODE_ENV === 'development_test' ?
                'localhost'
                : 'ERROR!', 
            port: '5432',
            user: 'postgres',
            password: 'possupossu',
            database: 'swaplings'
        },
    debug: false,
    pool: { min: 2, max: 5 },
}

export function getDatabaseConnection(): Knex  {
    return knex(TEST_DB_CONFIG)
}