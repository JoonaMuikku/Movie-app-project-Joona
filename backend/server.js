import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import movieRoutes from './routes/movieRoutes.js';
import pool from './config/db.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', movieRoutes);

// Routes
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ error: err.message });
});

// Test the database connection
(async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1); // Exit the process if the database connection fails
    }
})();

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});