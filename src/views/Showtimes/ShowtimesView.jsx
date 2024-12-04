import React, { useState, useEffect } from "react";
import axios from "axios";
import './ShowtimeView.css'; // Import custom CSS

const ShowtimesView = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moviePosters, setMoviePosters] = useState({}); // Store poster images by movie title

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
      setLoading(false);

      // Fetch movie poster images from TMDB API based on the movie titles
      await fetchMoviePosters(shows);
    } catch (err) {
      setError("Failed to fetch showtimes data. Please try again later.");
      setLoading(false);
    }
  };
  fetchShowtimes();
  }, []);

  const fetchMoviePosters = async (shows) => {
    const movieTitles = shows.map((show) => show.title);
    const posters = {};

    for (const title of movieTitles) {
      try {
        const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: "cbf0362bb54624f00a21c2e51270b3a0", //your API key here
            query: title,
          },
        });

        // Check if the poster is available
        const posterPath = tmdbResponse.data.results[0]?.poster_path;
        if (posterPath) {
          posters[title] = `https://image.tmdb.org/t/p/w500${posterPath}`; // Use the poster URL
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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Showtimes</h2>
      {loading && <p>Loading showtimes...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="showtimes-container">
          {showtimes.map((show, index) => (
            <div className="showtime-card" key={index}>
              <div className="showtime-content">
                <div className="showtime-image">
                  {/* Display movie poster image */}
                  {moviePosters[show.title] ? (
                    <img
                      src={moviePosters[show.title]}
                      alt={show.title}
                      className="showtime-poster"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Placeholder"
                      className="showtime-poster"
                    />
                  )}
                </div>
                <div className="showtime-info">
                  <h5 className="showtime-title">{show.title}</h5>
                  <p><strong>Theatre:</strong> {show.theatre}</p>
                  <p><strong>Start Time:</strong> {new Date(show.startTime).toLocaleString()}</p>
                  <p><strong>End Time:</strong> {new Date(show.endTime).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowtimesView;