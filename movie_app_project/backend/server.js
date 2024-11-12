import  express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
//import userRoutes = require('./routes/userRoutes');
//import movieRoutes = require('./routes/movieRoutes');
//import reviewRoutes = require('./routes/reviewRoutes');
//import groupRoutes = require('./routes/groupRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/groups', groupRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
