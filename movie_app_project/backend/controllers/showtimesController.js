const { fetchFinnkinoData } = require('../middleware/fetchFinnkinoData');
const Showtime = require('../models/showtimeModel');  // Unused at the moment, will be used later

const getShowtimes = async (req, res) => {
    try {
        const data = await fetchFinnkinoData(req.params.theatreId);
        const showtimes = data.map(item => ({
            movie: item.movie,
            theater: item.theater,
            date: item.date,
            time: item.time
        }));
        
        res.status(200).json({ success: true, showtimes });
    } catch (error) {
        console.error('Error fetching showtimes:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch showtimes.' });
    }
};

module.exports = { getShowtimes };
