export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

export type CreatePersonInput = {
  id: string
  username: string
  passwordhash: string
  email: string
  role: Role
}

export type PersonInDatabase = {
  id: string
  username: string
  passwordhash: string
  email: string
  role: Role
  deleted: boolean
}

export type PublicPerson = {
  id: string
  username: string
  email: string
  role: Role
  deleted: boolean
}

export type UpdatePersonData = {
  username?: string
  passwordhash?: string
  email?: string
}

export type UpdatePersonInput = {
  username?: string
  password?: string
  email?: string
}

export type LoggingInPersonData = {
  id: string
  username: string
  passwordhash: string
  email: string
  role: Role
}

export type ServerState = 'STARTING' | 'RUNNING' | 'NOT_RUNNING'
