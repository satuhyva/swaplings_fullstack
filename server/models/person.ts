import { Base } from './base'
import { Role, PersonInDatabase, PublicPerson, UpdatePersonData, LoggingInPersonData } from '../types/types'


export class Person extends Base {

    static get tableName() {
        return 'Persons'
      }

    id: string
    username: string
    passwordhash: string
    email: string
    role: Role
    createdAt: Date
    updatedAt: Date    
    deleted: boolean 


    static get jsonSchema(): Record<string, any> {
        return {
        type: 'object',
        required: ['id', 'username', 'passwordhash', 'email', 'role'],
        properties: {
            id: { 
                type: 'string',
                // pattern: '/[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/'
            },
            username: { type: 'string' },
            passwordhash: { type: 'string' },
            email: { 
                type: 'string',
                // pattern: '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/'
            },
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
    }}

    // deletoidulle false arvo defaulttina
    // älä hae deleted henkilöitä
    // älä poista deleted henkilöitä suoraan, vaan tee sof ja hard delete

    public static async createPerson(input: PersonInDatabase): Promise<PublicPerson> {
        return await Person.query().insert(input).returning(['id', 'username', 'email', 'role', 'deleted'])
    }   

    public static async updatePerson(id: string, input: UpdatePersonData): Promise<PublicPerson[]> {
        return await Person.query().patch(input).where('id', id).returning(['id', 'username', 'email', 'role', 'deleted'])
    }

    public static async deletePerson(id: string): Promise<Pick<Person, 'id'>[]> {
        return await Person.query().delete().where('id', id).returning('id')
    }

    public static async getLoginData(username: string): Promise<LoggingInPersonData[]> {
        return await Person.query().where('username', username).returning(['id', 'username', 'passwordhash', 'role', 'email'])
    }
    
    // tätä pitää voida hakea vain henkilö itse (kaikki omat tietonsa)
    public static async findPerson(id: string): Promise<Person[]> {
        return await Person.query().where('id', id)
    }

    // tee erikseen public person, joka palauttaa vähemmän dataa, mikä tulee ilmeiseksi myöhemmin, kun myös itemeja

    public static async getAllTesting(): Promise<any> {
        return await Person.query()
    }

}

