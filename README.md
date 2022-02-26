# SWAPLINGS FULLSTACK APP
All the code for the fullstack SWAPLINGS app has been placed to the single swaplings repository. 

Client is in root folder and server is in folder "server".

A push to master branch initiates automatic deployment via a GitHub Action with the following jobs:
- build Docker images of client and server and places those in GitHub container image registry
- use those images (together with a postgres image) to perform testing for client alone, server with postgres, and end-to-end (cypress)
- if all tests are passed, deploy the client to Vercel and the server to Heroku

NB: Migrations have to be performed manually for production database in Heroku!

To run the migrations, go to the "server" folder and run the below command (with proper values)

    NODE_ENV=manual_migrations POSTGRES_HOST=<value> POSTGRES_USER=<value> POSTGRES_PASSWORD=<value> POSTGRES_DB=<value> npx knex migrate:latest 





# SERVER
The server is a Fastify Helix Graphql server with connection to PostgreSQL database via Objectionjs (knex).

## *Database*
The server needs a PostgreSQL database (connection data can be found in knexfile.js).

Make sure you have a Postgres database named "swaplings" available at "localhost" port 5432.

Install knex globally

    npm install -g knex

Run migrations for the database

    env NODE_ENV=development npx knex migrate:latest

## *Run server*
Run (in server folder):

    npm run dev 

Server is running at http://localhost:3001

## *Tests*
In one Terminal, start a server (in server folder): 


    npm run dev
Then run the tests in another Terminal (in server folder)

    npm run test 


# CLIENT
The CLIENT is a Nextjs React Typescript app. 
 
## *Run client*
Run (in root folder)
    
    npm run dev 

Client is running at http://localhost:3000

## *Tests*
For "client-alone"-tests, only the client is needed. In the root folder, just run

    npm run test 


To run end-to-end tests with Cypress, you might need to install Cypress globally. 
Then, make sure that (1) a database, (2) a server and (3) a client are running. 

Then (in root folder) run

    npm run cypress:run

**OR** (to open an interface to select the tests for running) run

    npm run cypress:open






