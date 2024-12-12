import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Create the context
export const ShowtimesContext = createContext();

// ShowtimesProvider component
const ShowtimesProvider = ({ children }) => {
  const [showtimes, setShowtimes] = useState([]);
  const [moviePosters, setMoviePosters] = useState({});
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShowtimes = useCallback(async (areaId = "") => {
    setLoading(true);
    try {
      const response = await axios.get("https://www.finnkino.fi/xml/Schedule", {
        params: { area: areaId },
      });
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const shows = Array.from(xmlDoc.getElementsByTagName("Show")).map((show) => ({
        title: show.getElementsByTagName("Title")[0]?.textContent,
        theatre: show.getElementsByTagName("Theatre")[0]?.textContent,
        startTime: show.getElementsByTagName("dttmShowStart")[0]?.textContent,
        endTime: show.getElementsByTagName("dttmShowEnd")[0]?.textContent,
      }));
      setShowtimes(shows);
      await fetchMoviePosters(shows);
    } catch (err) {
      console.error("Error fetching showtimes:", err);
      setError("Failed to fetch showtimes. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMoviePosters = async (shows) => {
    const movieTitles = Array.from(new Set(shows.map((show) => show.title)));
    const posters = {};

    const posterPromises = movieTitles.map(async (title) => {
      try {
        const tmdbResponse = await axios.get("https://api.themoviedb.org/3/search/movie", {
          params: {
            api_key: process.env.REACT_APP_TMDB_API_KEY,
            query: title,
          },
        });

        const posterPath = tmdbResponse.data.results[0]?.poster_path;
        posters[title] = posterPath
          ? `https://image.tmdb.org/t/p/w500${posterPath}`
          : null;
      } catch (err) {
        console.error(`Error fetching poster for ${title}:`, err);
        posters[title] = null;
      }
    });

    await Promise.all(posterPromises);
    setMoviePosters(posters);
  };

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasResponse = await axios.get("https://www.finnkino.fi/xml/TheatreAreas");
        const parser = new DOMParser();
        const areasDoc = parser.parseFromString(areasResponse.data, "text/xml");
        const areaList = Array.from(areasDoc.getElementsByTagName("TheatreArea")).map((area) => ({
          id: area.getElementsByTagName("ID")[0]?.textContent,
          name: area.getElementsByTagName("Name")[0]?.textContent,
        }));
        setAreas(areaList);
      } catch (err) {
        console.error("Error fetching areas:", err);
      }
    };

    fetchAreas();
    fetchShowtimes();
  }, [fetchShowtimes]);

  return (
    <ShowtimesContext.Provider
      value={{ showtimes, moviePosters, areas, loading, error, fetchShowtimes }}
    >
      {children}
    </ShowtimesContext.Provider>
  );
};

export default ShowtimesProvider;
