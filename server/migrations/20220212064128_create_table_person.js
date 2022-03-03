/* eslint-disable */

exports.up = async function(knex) {

    await knex.raw(`
            CREATE TYPE ROLE AS ENUM ('ADMIN', 'USER', 'GUEST');
        `
    )

    await knex.raw(`
      CREATE TABLE "Persons" (
        "id" uuid PRIMARY KEY,
        "username" VARCHAR(255) UNIQUE,
        "passwordhash" VARCHAR(255),
        "email" VARCHAR(255),
        "role" ROLE,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        "deleted" BOOLEAN DEFAULT false
      );
    `) 
    
    await knex.raw(`
        CREATE TRIGGER update_timestamp
        BEFORE UPDATE
        ON "Persons"
        FOR EACH ROW
        EXECUTE PROCEDURE update_timestamp();
    `) 
    
  }
  
  exports.down = async function(knex) {
    await knex.schema.dropTable('Persons')
    await knex.raw(`
            DROP TYPE ROLE;
        `
    )
  }
  