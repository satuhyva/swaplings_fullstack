
const connection = process.env.DATABASE_URL || {
  host: process.env.NODE_ENV === 'deployment_test' 
  ? 'postgres' 
  : process.env.NODE_ENV === 'development' ?
  'localhost' 
  : 'ERROR!', 
  port: '5432',
  user: 'postgres',
  password: 'possupossu',
  database: 'swaplings'
}

const data = {
  client: 'postgresql',
  connection: connection,
  debug: false,
  pool: { min: 2, max: 5 },
}


module.exports = {
    deployment_test: data,
    development: data,
    test: data,
    production: data
  }
