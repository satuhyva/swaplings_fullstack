import { createModule } from 'graphql-modules'
import fs from 'fs'
import path from 'path'
import { gql } from 'graphql-tag'
import { HealthQueryResolvers } from './health-query-resolvers'

const moduleName = 'Health'
const pathToFile = path.join(__dirname, `${moduleName.toLowerCase()}-schema.graphql`)
const typeDefsData = fs.readFileSync(pathToFile)
const typeDefs = gql(typeDefsData.toString())

export const HealthModule = createModule({
  id: moduleName,
  dirname: __dirname,
  typeDefs,
  resolvers: {
    Query: HealthQueryResolvers
  }
})
