import { Base } from './base'
import { Role, PersonInDatabase, PublicPerson } from '../types/types'


export class Person extends Base {

    static get tableName() {
        return 'Persons'
      }
    // static tableName: 'Persons'
    readonly id!: string
    username!: string
    passwordhash!: string
    email!: string
    role!: Role
    createdAt!: Date
    updatedAt!: Date    
    deleted!: boolean 


    static jsonSchema: Record<string, any> = {
        type: 'object',
        required: ['username', 'passwordhash', 'email', 'role'],
        properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            passwordhash: { type: 'string' },
            email: { type: 'string' },
            role: {
                type: 'string',
                enum: [Role.ADMIN, Role.USER, Role.GUEST]
            },
            createdAt: {
                type: 'string',
                description: 'Timestamp PostgreSQL format, as exemplified by 2022-02-12T08:14:26.825Z',
                pattern: '^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}T[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}.[0-9]{1,3}Z$'
            },
            updatedAt: {
                type: 'string',
                description: 'Timestamp PostgreSQL format, as exemplified by 2004-10-19 10:23:54+02',
                pattern: '^[0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2}T[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}.[0-9]{1,3}Z$'
            },
            deletedAt: {}
        }
    }

    public static async findPerson(id: string): Promise<Person[]> {
        return await Person.query().where('id', id)
    }

    public static async createPerson(input: PersonInDatabase): Promise<PublicPerson> {
        return await Person.query().insert(input).returning(['id', 'username', 'email', 'role', 'deleted'])
    }

    public static async getAllTesting(): Promise<any> {
        return await Person.query()
    }

}

// 2004-10-19 10:23:54+02
// '([0-9]{1,4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}\+[0-9]{1,2})'
// https://regex.observepoint.com