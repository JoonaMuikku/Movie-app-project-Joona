import fs from 'fs';
import path from 'path';
import pool from '../config/db.js';
import { hash } from 'bcrypt';
// import { sign } from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();


//const __dirname = import.meta.dirname;



// const initializeTestDb = () => {
//     const sql = fs.readFileSync(path.resolve(__dirname, "../data.sql"), 'utf-8');
//     pool.query(sql);
// }



const insertTestUser = async (email, password) => {
    hash(password, 10, (error, hashedPassword) => {
        pool.query("INSERT INTO users (first_name, last_name email, password) VALUES ($1, $2, $3 ,$4 ) RETURNING *", 
            [first_name, last_name, email, hashedPassword], 
        );
    });
}

const getToken = async (email) => {
    return jwt.sign({ user: email }, process.env.JWT_SECRET_KEY)
}

export {  insertTestUser, getToken };

//initializeTestDb,