
import React, { useState, useEffect } from "react";
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

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {movies.length > 0 ? (
                    movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                ) : (
                    <p style={{ textAlign: "center", width: "100%" }}>No results found.......</p>
                )}
            </div>
        </div>
    );
}
