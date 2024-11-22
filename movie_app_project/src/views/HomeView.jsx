import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../Api/movieApi';
import { MovieCard } from '../Components/MovieCard/MovieCard.jsx';
import { Carousel } from 'react-bootstrap';

export default function HomeView() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const moviesData = await fetchMovies();
            setMovies(moviesData);
        };

        fetchData();
    }, []);

    const chunkMovies = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    const movieChunks = chunkMovies(movies, 4);

    return (
        <>
            <h1 className="text-center my-4">Popular Movies</h1>
            <div className="container mt-4">
                {movies.length > 0 ? (
                    <Carousel interval={null}>
                        {movieChunks.map((chunk, index) => (
                            <Carousel.Item key={index}>
                                <div className="row">
                                    {chunk.slice(0, 4).map((movie) => (
                                        <div className="col-md-3 mb-4" key={movie.id}>
                                            <MovieCard movie={movie} />
                                        </div>
                                    ))}
                                </div>
                                <div className="row">
                                    {chunk.slice(4, 8).map((movie) => (
                                        <div className="col-md-3 mb-4" key={movie.id}>
                                            <MovieCard movie={movie} />
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <p className="text-center">Loading...</p>
                )}
            </div>
        </>
    );
}