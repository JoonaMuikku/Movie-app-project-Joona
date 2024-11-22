import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchGenres } from "../../Api/movieApi";
import SearchBar from './SearchBar'; // Ensure this import path is correct
import SideBarMenu from "./SideBarMenu";
import '../../App.css';

export default function Header() {
    const [genres, setGenres] = useState([]);
    const [filters, setFilters] = useState({
        title: "",
        genre: "",
        year: "",
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Fetch genres on mount
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

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?title=${filters.title}&genre=${filters.genre}&year=${filters.year}`);
    };

    return (
        <div className="sticky-top py-3 _navigation">
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <div>
                        <button
                            className="navbar-toggler me-3"
                            type="button"
                            onClick={toggleSidebar}
                            aria-label="Toggle navigation"
                        >
                            <i className="bi bi-list"></i>
                        </button>

                        {/* App Name */}
                        <Link to="/" className="navbar-brand fw-bold fs-3">
                            Moviq
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <SearchBar 
                        filters={filters}
                        setFilters={setFilters}
                        handleSearch={handleSearch}
                    />

                    <button className="btn btn-orange-transparent fs-6 rounded-0 px-4 px-3">
                        <Link to="sign-in">
                            Sign In
                        </Link>
                    </button>
                </div>
            </nav>

            {/* Sidebar Menu */}
            <SideBarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
    );
}