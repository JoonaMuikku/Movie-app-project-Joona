import React, { useState, useEffect } from "react";
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
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {movies.length > 0 ? (
                    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                ) : (
                    <p>No results found.......</p>
                )}
            </div>
        </div>
    );
}