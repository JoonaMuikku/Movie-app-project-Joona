import React, { useContext, useState } from "react";
import { ShowtimesContext } from "../../context/ShowtimesContext";
import ShowtimeCard from "./Showtime_card";
import "./Showtimes_card.css";

const ShowtimesHomeView = () => {
  const { showtimes, moviePosters, areas, loading, error, fetchShowtimes } =
    useContext(ShowtimesContext);

  const [selectedArea, setSelectedArea] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleAreaChange = (areaId) => {
    setSelectedArea(areaId);
    fetchShowtimes(areaId);
    setCurrentPage(1); // Reset pagination on area change
  };

  const filteredShowtimes = showtimes.filter((show) =>
    show.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  // Pagination logic
  const indexOfLastShowtime = currentPage * itemsPerPage;
  const indexOfFirstShowtime = indexOfLastShowtime - itemsPerPage;
  const currentShowtimes = filteredShowtimes.slice(
    indexOfFirstShowtime,
    indexOfLastShowtime
  );

  const totalPages = Math.ceil(filteredShowtimes.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageButtons = [];
    const maxButtons = 5;
    let startPage, endPage;

    if (totalPages <= maxButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = maxButtons;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - maxButtons + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    if (currentPage > 1) {
      pageButtons.push(
        <button
          key="prev"
          onClick={() => paginate(currentPage - 1)}
          className="btn btn-orange page-button"
        >
          Previous
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`btn btn-orange page-button ${
            currentPage === i ? "active" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pageButtons.push(
        <button
          key="next"
          onClick={() => paginate(currentPage + 1)}
          className="btn btn-orange page-button"
        >
          Next
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="container mt-5 showtimes-home-container">
      <h2 className="text-center mb-4">Showtimes</h2>

      {/* Search Bar */}
      <div className="search-bar mb-4">
        <select
          value={selectedArea}
          onChange={(e) => handleAreaChange(e.target.value)}
          className="form-select mb-2"
        >
          <option value="">All Areas</option>
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by movie title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="form-control"
        />
      </div>

      {loading && <p>Loading showtimes...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <>
          <div className="showtimes-container">
            {currentShowtimes.map((show, index) => (
              <ShowtimeCard
                key={index}
                startTime={new Date(show.startTime).toLocaleString()}
                endTime={new Date(show.endTime).toLocaleString()}
                movieTitle={show.title}
                theaterLocation={show.theatre}
                posterUrl={moviePosters[show.title]}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">{renderPagination()}</div>
        </>
      )}
    </div>
  );
};

export default ShowtimesHomeView;
