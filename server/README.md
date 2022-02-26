# SWAPLINGS API SERVER

- asenna paikallisesti PostgreSQL, ja luo sinne tarjolle database "swaplings" porttiin 5432 
  (username ja salasana löytyvät knexfile.js-tiedostosta)

- asenna knex globaalisti:
```npm install -g knex```

- aja migraatiot kansiossa "server" 
```env NODE_ENV=development npx knex migrate:latest```

- käynnistä server
```npm run dev```

- aja testit (kun server käynnissä, HUOM: nollaa tietokannan!!!)
```npm run test```

- master-haaran push remote repositoryyn aiheuttaa automaattisen testauksen ja deploymentin








<!-- ## To run the Docker PostgreSQL database locally:

```docker run -d -p 5432:5432 --name swaplings -e POSTGRES_PASSWORD=postgres postgres```


### To create a new migration file:
```knex migrate:make <name-of-file>``` 
For example: 
```./node_modules/.bin/knex migrate:make create_person_table``` 

// Tämä tarvitaan Objection moduleita varten
"strictNullChecks": false,


env NODE_ENV=development ./node_modules/.bin/knex migrate:make create_person_table -->