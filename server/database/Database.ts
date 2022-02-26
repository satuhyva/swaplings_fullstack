/* eslint-disable @typescript-eslint/no-unsafe-call */
import { knex, Knex } from 'knex'
import { Model } from 'objection'
import { connectionData } from './connectionData'



export class Database {

    private static BDinstance: Database
    private knexInstance: Knex | undefined
    private config: Knex.Config | undefined


    public static get DB_CONFIG() {
        return {
            acquireConnectionTimeout: 30000,
            client: 'postgresql',
            connection: connectionData,
            debug: false,
            pool: { min: 2, max: 5 },
        }
    }

    get knex() {
        return this.knexInstance
    }

    static get instance() {
        if (!Database.BDinstance) {
            Database.BDinstance = new Database()
        }
        return Database.BDinstance
    }


    connect(config = Database.DB_CONFIG) {
        console.log('Starting to connect to database...')
        this.config = config
        this.knexInstance = knex(this.config)
        Model.knex(this.knexInstance)
    }

}


