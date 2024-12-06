import React  from 'react'
import ShowtimeCard from './Showtime_card'
import axios from 'axios';
import { useEffect, useState } from 'react';

const ShowtimesHomeView = () => {
    const [showtimes, setShowtimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [moviePosters, setMoviePosters] = useState({}); // Store poster images by movie title


     // Pagination state
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 6; // Number of items to display per page


    useEffect(() => {
        const fetchShowtimes = async () => {
            try {
                const response = await axios.get("https://www.finnkino.fi/xml/Schedule");
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");
                const shows = Array.from(xmlDoc.getElementsByTagName("Show")).map((show) => ({
                    title: show.getElementsByTagName("Title")[0]?.textContent,
                    theatre: show.getElementsByTagName("Theatre")[0]?.textContent,
                    startTime: show.getElementsByTagName("dttmShowStart")[0]?.textContent,
                    endTime: show.getElementsByTagName("dttmShowEnd")[0]?.textContent,
                }));
                setShowtimes(shows);
                await fetchMoviePosters(shows); // Fetch movie posters after fetching showtimes
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch showtimes data. Please try again later.");
                setLoading(false);
            }
        };

        const fetchMoviePosters = async (shows) => {
            const movieTitles = shows.map((show) => show.title);
            const posters = {};

            for (const title of movieTitles) {
                try {
                    const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                        params: {
                            api_key: process.env.REACT_APP_TMDB_API_KEY,
                            query: title,
                        },
                    });

                    const posterPath = tmdbResponse.data.results[0]?.poster_path;
                    if (posterPath) {
                        posters[title] = `https://image.tmdb.org/t/p/w500${posterPath}`;
                    } else {
                        posters[title] = null; // No poster found for this movie
                    }
                } catch (err) {
                    console.error(`Error fetching poster for ${title}:`, err);
                    posters[title] = null; // In case of any errors
                }
            }

            setMoviePosters(posters);
        };

        fetchShowtimes();
    }, []);

    // Calculate the current items to display
    const indexOfLastShowtime = currentPage * itemsPerPage;
    const indexOfFirstShowtime = indexOfLastShowtime - itemsPerPage;
    const currentShowtimes = showtimes.slice(indexOfFirstShowtime, indexOfLastShowtime);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(showtimes.length / itemsPerPage);

    // Create pagination buttons
    const renderPagination = () => {
        const pageButtons = [];
        const maxButtons = 5; // Maximum number of buttons to display
        let startPage, endPage;
    
        if (totalPages <= maxButtons) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = maxButtons;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - maxButtons + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }
    
        // Add "Previous" button
        if (currentPage > 1) {
            pageButtons.push(
                <button key="prev" onClick={() => paginate(currentPage - 1)} className="page-button">
                    Previous
                </button>
            );
        }
    
        // Add page number buttons
        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={`page-button ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </button>
            );
        }
    
        // Add ellipsis if needed
        if (endPage < totalPages) {
            pageButtons.push(<span key="ellipsis">...</span>);
            pageButtons.push(
                <button key={totalPages} onClick={() => paginate(totalPages)} className="page-button">
                    {totalPages}
                </button>
            );
        }
    
        // Add "Next" button
        if (currentPage < totalPages) {
            pageButtons.push(
                <button key="next" onClick={() => paginate(currentPage + 1)} className="page-button">
                    Next
                </button>
            );
        }
    
        return pageButtons;
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Showtimes</h2>
            {loading && <p>Loading showtimes...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
                <div className="showtimes-container">
                    {currentShowtimes.map((show, index) => (
                        <ShowtimeCard
                            key={index}
                            startTime={new Date(show.startTime).toLocaleString()}
                            endTime={new Date(show.endTime).toLocaleString()}
                            movieTitle={show.title}
                            theaterLocation={show.theatre}
                            posterUrl={moviePosters[show.title]} // Pass the poster URL
                        />
                    ))}
                </div>
            )}
            {/* Pagination Controls */}
            <div className="pagination">
                {renderPagination()}
            </div>
        </div>
    );
};

export default ShowtimesHomeView;