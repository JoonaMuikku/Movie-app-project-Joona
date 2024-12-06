import React from 'react';
import './Showtimes_card.css'; // Create a CSS file for styling



const ShowtimeCard = ({ startTime, endTime, movieTitle, theaterLocation, posterUrl }) => {
    return (
        <div className="showtime-card">
        
            <div className="showtime-image">
                {posterUrl ? (
                    <img src={posterUrl} alt={movieTitle} className=" showtime-poster" />
                ) : (
                    <div className="no-poster">No Poster Available</div>
                )}
            </div>
            <div className="showtime-info">
                <h5 className="showtime-title">{movieTitle}</h5>
                <p><strong>Theatre:</strong> {theaterLocation}</p>
                <p><strong>Start Time:</strong> {startTime}</p>
                <p><strong>End Time:</strong> {endTime}</p>
            </div>
        
    </div>
);
};

export default ShowtimeCard;