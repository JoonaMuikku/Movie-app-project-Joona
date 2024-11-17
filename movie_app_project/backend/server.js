require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const showtimesRoutes = require('./routes/showtimesRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
// Configure CORS to allow frontend requests
const allowedOrigins = [
    'http://localhost:3000', // Frontend development URL
];
app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));
// Middleware to parse JSON requests
app.use(bodyParser.json());

app.use('/api/showtimes', showtimesRoutes);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});