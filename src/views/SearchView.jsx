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
        <div className="container py-4">
            <h1 className="text-center mb-4">Search Results</h1>

            <div className="row">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div className="col-md-2 mb-4" key={movie.id}>
                            <MovieCard movie={movie} />
                        </div>
                    ))
                ) : (
                    <p className="text-center w-100">No results found...</p>
                )}
            </div>
        </div>
    );
}
