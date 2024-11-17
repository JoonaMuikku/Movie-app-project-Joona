const pool = require('../config/db');

const Showtime = {
    async insertShowtime(showtime) {
        const query = `
            INSERT INTO showtimes (movie_id, theater_name, showtime_date, showtime_time)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [
            showtime.movie_id,
            showtime.theater_name,
            showtime.showtime_date,
            showtime.showtime_time
        ];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    async getAllShowtimes() {
        const query = 'SELECT * FROM showtimes';
        const result = await pool.query(query);
        return result.rows;
    }
};

module.exports = Showtime;
