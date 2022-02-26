export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST'
}


export type PersonInDatabase = {
    id: string,
    username: string,
    passwordhash: string,
    email: string,
    role: Role,
    deleted: boolean
}


export type PublicPerson = {
    id: string,
    username: string,
    email: string,
    role: Role,
    deleted: boolean
}