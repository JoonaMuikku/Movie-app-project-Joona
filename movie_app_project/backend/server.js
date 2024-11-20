import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
//import userRoutes from ('./routes/userRoutes');
import MovieRouter from './routes/movieRoutes.js';
//import reviewRoutes from ('./routes/reviewRoutes');
//import groupRoutes from ('./routes/groupRoutes');
import { getMoviesfromAPI } from './models/movieModel.js';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true
}));
app.use(bodyParser.json());


//app.use('/api/users', userRoutes);
app.use('/', MovieRouter);
//app.use('/api/reviews', reviewRoutes);
//app.use('/api/groups', groupRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    try {
         getMoviesfromAPI(); // Populate the database with movies on startup
        console.log('Movies populated from API');
    } catch (error) {
        console.error('Error populating movies on startup:', error);
    }
});

