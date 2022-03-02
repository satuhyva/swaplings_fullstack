


export const connectionData = process.env.DATABASE_URL ?
    process.env.DATABASE_URL
    :
    {
        host: process.env.NODE_ENV === 'deployment_test' 
            ? 'postgres' 
            : process.env.NODE_ENV === 'development' ?
            'localhost' 
            : process.env.NODE_ENV === 'development_test' ?
            'localhost' 
            : process.env.NODE_ENV === 'manual_migrations' ?
            process.env.POSTGRES_HOST
            : 'ERROR!', 
        port: '5432',
        user: process.env.NODE_ENV !== 'manual_migrations' ? 'postgres' : process.env.POSTGRES_USER,
        password:  process.env.NODE_ENV !== 'manual_migrations' ? 'possupossu' : process.env.POSTGRES_PASSWORD,
        database:  process.env.NODE_ENV !== 'manual_migrations' ? 'swaplings' : process.env.POSTGRES_DB
    }



