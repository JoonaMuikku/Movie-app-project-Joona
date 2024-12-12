import React, { useContext, useState } from "react";
import { ShowtimesContext } from "../../context/ShowtimesContext";
import ShowtimeCard from "../../components/Showtimes_home_page/Showtime_card";
import "./ShowtimeView.css";

const ShowtimesView = () => {
  const { showtimes, moviePosters, areas, loading, error, fetchShowtimes } =
    useContext(ShowtimesContext);

  const [selectedArea, setSelectedArea] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const handleAreaChange = (areaId) => {
    setSelectedArea(areaId);
    fetchShowtimes(areaId);
  };

  const filteredShowtimes = showtimes.filter((show) =>
    show.title.toLowerCase().includes(searchTitle.toLowerCase())
  );

  return (
    <div className="container mt-5 showtimes-view-container">
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
        <div className="showtimes-container">
          {filteredShowtimes.map((show, index) => (
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
      )}
    </div>
  );
};

export default ShowtimesView;
