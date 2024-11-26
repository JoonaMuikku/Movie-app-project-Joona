import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    jwtSecretkey: process.env.JWT_SECRET_KEY,
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL');
});

//console.log('JWT Secret Key:', process.env.JWT_SECRET_KEY);

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});


export default pool;