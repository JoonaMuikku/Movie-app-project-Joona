
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGenres } from "../../api/movieApi";
import "./Header.css";

export default function SearchBar() {
    const [genres, setGenres] = useState([]);
    const [filters, setFilters] = useState({
        title: "",
        genre: "",
        year: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenreData = async () => {
            try {
                const genresData = await fetchGenres();
                setGenres(genresData);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenreData();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?title=${filters.title}&genre=${filters.genre}&year=${filters.year}`);
    };
    // Handle Enter Key Press
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch(e);
        }
    };


    return (
        <form
            className="d-flex align-items-center mx-auto"
            onSubmit={handleSearch}
            style={{ width: "50%", justifyContent: "center" }}
        >
            <input
                className="form-control"
                type="text"
                name="title"
                placeholder="Search by title"
                value={filters.title}
                onChange={handleFilterChange}
                onKeyDown={handleKeyDown}
                style={{ width: "50%", fontSize: "14px", border: "1px solid #ccc" }}
            />
            <select
                className="form-select"
                name="genre"
                value={filters.genre}
                onChange={handleFilterChange}
                onKeyDown={handleKeyDown}
                style={{ width: "25%", marginLeft: "5px", fontSize: "14px" }}
            >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
            <select
                className="form-select"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                onKeyDown={handleKeyDown}
                style={{ width: "20%", marginLeft: "5px", fontSize: "14px" }}
            >
                <option value="">All Years</option>
                {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <button
                className="btn btn-orange"
                type="submit"
                style={{ marginLeft: "5px", fontSize: "14px" }}
            >
                <i className="bi bi-search"></i>
            </button>
        </form>
    );
}
