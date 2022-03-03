import 'reflect-metadata'
import Server from './server'
import { Database } from './database/Database'

let server: Server | null = null

async function startSwaplingsServer() {
  console.log('Starting SWAPLINGS server start process...')
  server = new Server()
  Database.instance.connect()
  await server.start()
}

try {
  void startSwaplingsServer()
} catch (error) {
  console.log(error)
}
