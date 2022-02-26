/* eslint-disable @typescript-eslint/no-unsafe-call */
import { knex, Knex } from 'knex'
import { Model } from 'objection'


// Ilmeisesti täällä määritettävät knex-konfiguraatiot ovat appille (kun käytetään Objectionin Modelia),
// kun taas knexfilessä olevia konfiguraatioita käytetään, kun tehdään migraatiot?
export class Database {

    private static _instance: Database
    private _knex: Knex | undefined
    private config: Knex.Config | undefined


    public static get DEFAULT_DB_CONFIG() {
        return {
            acquireConnectionTimeout: 30000,
            client: 'postgresql',
            connection: 
                process.env.DATABASE_URL || 
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
    }

    get knex() {
        return this._knex
    }

    static get instance() {
        if (!Database._instance) {
            Database._instance = new Database()
        }
        return Database._instance
    }


    connect(config = Database.DEFAULT_DB_CONFIG) {
        console.log('Starting to connect to database...')
        this.config = config
        this._knex = knex(this.config)
        Model.knex(this._knex)
    }

}