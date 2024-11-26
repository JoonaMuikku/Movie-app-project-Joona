import React, { useState, useEffect } from "react";
<<<<<<< HEAD:movie_app_project/src/views/SearchView.jsx
import { fetchMovies } from "../Api/movieApi";
import SearchBar from "../Components/Header/SearchBar"; // Update the import path as necessary
import { MovieCard } from "../Components/MovieCard/MovieCard";

export default function SearchView() {
    const [movies, setMovies] = useState([]);
    const [filters, setFilters] = useState({
        title: "",
        genre: "",
        year: ""
    });

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const results = await fetchMovies(filters);
            setMovies(results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Search Movies</h1>
            <SearchBar 
                filters={filters}
                setFilters={setFilters}
                handleSearch={handleSearch}
            />
=======
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../api/movieApi";
import { MovieCard } from "../components/MovieCard/MovieCard";

export default function SearchView() {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const title = searchParams.get("title") || "";
            const genre = searchParams.get("genre") || "";
            const year = searchParams.get("year") || "";
            try {
                const results = await fetchMovies({ title, genre, year });
                setMovies(results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchData();
    }, [searchParams]);

    return (
        <div style={{ padding: "20px",  }}>
            <h1 style={{ textAlign: "center", padding: "10px", fontSize: "2em" }}>Search Results</h1>

>>>>>>> 296e7f0a2684e425857d08862ea9029bc7da0e45:src/views/SearchView.jsx
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {movies.length > 0 ? (
                    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                ) : (
<<<<<<< HEAD:movie_app_project/src/views/SearchView.jsx
                    <p>No results found.......</p>
=======
                    <p style={{ textAlign: "center", width: "100%" }}>No results found.......</p>
>>>>>>> 296e7f0a2684e425857d08862ea9029bc7da0e45:src/views/SearchView.jsx
                )}
            </div>
        </div>
    );
<<<<<<< HEAD:movie_app_project/src/views/SearchView.jsx
}
=======
}
>>>>>>> 296e7f0a2684e425857d08862ea9029bc7da0e45:src/views/SearchView.jsx
