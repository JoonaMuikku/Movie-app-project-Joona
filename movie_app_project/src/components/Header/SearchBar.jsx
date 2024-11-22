import React from 'react';

export default function SearchBar({ filters, setFilters, handleSearch }) {
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <form
            className="d-flex align-items-center mx-auto"
            onSubmit={handleSearch}
            style={{
                width: "100%",
                justifyContent: "center",
            }}
        >
            <input
                className="form-control"
                type="text"
                name="title"
                placeholder="Search by title"
                value={filters.title}
                onChange={handleFilterChange}
                style={{
                    width: "50%",
                    fontSize: "14px",
                    border: "1px solid #ccc",
                }}
            />
            <select
                className="form-select"
                name="genre"
                value={filters.genre}
                onChange={handleFilterChange}
                style={{
                    width: "25%",
                    marginLeft: "5px",
                    fontSize: "14px",
                }}
            >
                <option value="">All Genres</option>
                {/* Populate genres here */}
            </select>
            <select
                className="form-select"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                style={{
                    width: "20%",
                    marginLeft: "5px",
                    fontSize: "14px",
                }}
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
                style={{
                    marginLeft: "5px",
                    fontSize: "14px",
                }}
            >
                <i className="bi bi-search"></i>
            </button>
        </form>
    );
}