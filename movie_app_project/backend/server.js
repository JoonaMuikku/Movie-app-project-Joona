import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import movieRoutes from './routes/movieRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', movieRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});