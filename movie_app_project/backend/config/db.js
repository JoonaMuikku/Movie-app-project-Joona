import dotenv from 'dotenv'
import pkg from 'pg'


const environment = process.env.NODE_ENV;

dotenv.config();

const {Pool} = pkg

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: environment === "developement" ? process.env.DB_NAME : process.env.TEST_DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

//confirmation on database connection
pool.on('connect',() => {
    console.log('connected  to PostegresSQL');
})

pool.on('error', (err) => {
    console.error('unexpected error on idle client', err);
    process.exit(-1);
    })

export {pool};
