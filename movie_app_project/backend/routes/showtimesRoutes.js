const express = require('express');
const { getShowtimes } = require('../controllers/showtimesController');

const router = express.Router();

// Route to fetch showtimes for a specific theatreId
router.get('/:theatreId', getShowtimes);

module.exports = router;
