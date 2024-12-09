import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { fetchMovieDetails } from "../api/movieApi";
import ShowtimeCard from "../components/Showtimes_home_page/Showtime_card";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function GroupDetailsView() {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [joinRequests, setJoinRequests] = useState([]);
    const [isMember, setIsMember] = useState(false);
    const [isRequested, setIsRequested] = useState(false);
    const [groupMovies, setGroupMovies] = useState([]);
    const [showAddMovieModal, setShowAddMovieModal] = useState(false);
    const [movieId, setMovieId] = useState("");
    const [groupShowtimes, setGroupShowtimes] = useState([]);
    const [showAddShowtimeModal, setShowAddShowtimeModal] = useState(false);
    const [availableShowtimes, setAvailableShowtimes] = useState([]);
    const [moviePosters, setMoviePosters] = useState({});

        const fetchGroupDetails = useCallback(async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/groups/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const groupData = response.data.group;
                setGroup(groupData);
                setIsMember(groupData.is_member);
                setIsRequested(groupData.has_pending_request);
                setLoading(false);
            } catch (error) {
                if (error.response?.status === 403) {
                    setError("You don't have access to this group");
                } else {
                    setError("Failed to fetch group details");
                }
                setLoading(false);
            }
        }, [id, token]);

        const fetchPendingRequests = useCallback(async () => {
            if (!user || user.user_id !== group?.owner_id) return;
    
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/groups/${id}/requests`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setJoinRequests(response.data.requests);
            } catch (error) {
                console.error('Failed to fetch pending requests:', error);
            }
        }, [id, token, user, group?.owner_id]);

        const fetchGroupMovies = useCallback(async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/groups/${id}/movies`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const moviesWithDetails = await Promise.all(
                    response.data.movies.map(async (groupMovie) => {
                        const movieDetails = await fetchMovieDetails(groupMovie.tmdb_id);
                        return { ...groupMovie, details: movieDetails.movie };
                    })
                );
                setGroupMovies(moviesWithDetails);
            } catch (error) {
                console.error("Error fetching group movies:", error);
            }
        }, [id, token])

        const fetchMoviePoster = async (movieTitle) => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}`
                );
                if (response.data.results && response.data.results.length > 0) {
                    const posterPath = response.data.results[0].poster_path;
                    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
                }
                return null;
            } catch (error) {
                console.error("Error fetching movie poster:", error);
                return null;
            }
        };

        const fetchGroupShowtimes = useCallback(async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/groups/${id}/showtimes`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setGroupShowtimes(response.data.showtimes);

                const posters = {};
                for (const showtime of response.data.showtimes) {
                    const posterUrl = await fetchMoviePoster(showtime.movie_title);
                    if (posterUrl) {
                        posters[showtime.movie_title] = posterUrl;
                    }
                }
                setMoviePosters(posters);
            } catch (error) {
                console.error("Error fetching group showtimes:", error);
                toast.error("Failed to fetch group showtimes");
            }
        }, [id, token]);

        const addShowtimeToGroup = async (showtime) => {
            try {
                await axios.post(
                    `${API_BASE_URL}/groups/${id}/showtimes`,
                    {
                        movie_title: showtime.title,
                        theatre: showtime.theatre,
                        start_time: showtime.startTime,
                        end_time: showtime.endTime
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                toast.success("Showtime added to group successfully");
                fetchGroupShowtimes();
            } catch (error) {
                console.error("Error adding showtime to group:", error);
                toast.error("Failed to add showtime to group");
            }
        };

        const fetchAvailableShowtimes = async () => {
            try {
                const response = await axios.get("https://www.finnkino.fi/xml/Schedule/");
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(response.data, "text/xml");
                const shows = await Promise.all(
                    Array.from(xmlDoc.getElementsByTagName("Show")).map(async show => {
                        const title = show.getElementsByTagName("Title")[0]?.textContent;
                        const posterUrl = await fetchMoviePoster(title);
                        
                        return {
                            id: show.getElementsByTagName("ID")[0]?.textContent,
                            title: title,
                            theatre: show.getElementsByTagName("Theatre")[0]?.textContent,
                            startTime: show.getElementsByTagName("dttmShowStart")[0]?.textContent,
                            endTime: show.getElementsByTagName("dttmShowEnd")[0]?.textContent,
                            posterUrl: posterUrl
                        };
                    })
                );
                setAvailableShowtimes(shows);
            } catch (error) {
                console.error("Error fetching Finnkino showtimes:", error);
                toast.error("Failed to fetch showtimes");
            }
        };

        const removeShowtime = async (showtimeId) => {
            try {
                await axios.delete(
                    `${API_BASE_URL}/groups/${id}/showtimes/${showtimeId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                toast.success("Showtime removed successfully");
                fetchGroupShowtimes(); 
            } catch (error) {
                console.error("Error removing showtime:", error);
                toast.error("Failed to remove showtime");
            }
        };

    
        useEffect(() => {
            fetchGroupDetails();
            fetchGroupMovies();
            if (user?.user_id === group?.owner_id) {
                fetchPendingRequests();
            }
            fetchGroupShowtimes();
        }, [fetchGroupDetails, fetchGroupMovies, fetchPendingRequests, fetchGroupShowtimes, user?.user_id, group?.owner_id]);

    const handleJoinRequest = async () => {
        try {
            await axios.post(
                `${API_BASE_URL}/groups/${id}/join`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Join request sent successfully');
            setIsRequested(true);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to send join request');
        }
    };

    const handleRequestResponse = async (requestId, action) => {
        try {
            await axios.post(
                `${API_BASE_URL}/groups/requests/${requestId}`,
                { action },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`Request ${action}ed successfully`);
            fetchGroupDetails();
            fetchPendingRequests();
        } catch (error) {
            toast.error(`Failed to ${action} request`);
        }
    };

    const handleLeaveGroup = async () => {
        if (!window.confirm('Are you sure you want to leave this group?')) return;

        try {
            await axios.delete(
                `${API_BASE_URL}/groups/${id}/leave`,
                { 
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success('Left group successfully');
            navigate('/groups');
        } catch (error) {
            console.error('Leave group error:', error); 
            toast.error('Failed to leave group');
        }
    };

    const handleAddMovie = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${API_BASE_URL}/groups/${id}/movies`,
                { tmdb_id: movieId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Movie added to group successfully");
            setShowAddMovieModal(false);
            setMovieId("");
            fetchGroupMovies();
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to add movie to group");
        }
    };

    const handleRemoveMovie = async (movieId) => {
        if (!window.confirm('Are you sure you want to remove this movie?')) return;
        
        try {
            await axios.delete(
                `${API_BASE_URL}/groups/${id}/movies/${movieId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Movie removed successfully");
            fetchGroupMovies();
        } catch (error) {
            toast.error("Failed to remove movie");
        }
    };

    if (loading) return <div className="container mt-5"><h2>Loading...</h2></div>;
    if (error) return <div className="container mt-5"><h2>{error}</h2></div>;
    if (!group) return <div className="container mt-5"><h2>Group not found</h2></div>;

    return (
        <div className="container mt-5">
            <div className="card" style={{ 
                backgroundColor: '#2A2A2A',
                transform: 'none',
                transition: 'none'
            }}>
                <div className="card-header d-flex justify-content-between align-items-center" style={{
                    transform: 'none',
                    transition: 'none'
                }}>
                    <h2 style={{ color: '#FFD700' }}>{group.group_name}</h2>
                    {user && (
                        user.user_id === group.owner_id ? (
                            <button 
                                className="btn btn-primary"
                                onClick={() => navigate(`/groups/${id}/admin`)}
                            >
                                Admin Panel
                            </button>
                        ) : isMember && (
                            <button 
                                className="btn btn-danger"
                                onClick={handleLeaveGroup}
                            >
                                Leave Group
                            </button>
                        )
                    )}
                </div>
                <div className="card-body text-white" style={{
                    transform: 'none',
                    transition: 'none'
                }}>
                    <h5 style={{ color: '#FFD700' }}>Group Owner</h5>
                    <p>{group.owner_first_name} {group.owner_last_name}</p>
                    {user && !isMember && !isRequested && (
                        <div className="mb-3">
                            <button 
                                className="btn btn-primary"
                                onClick={handleJoinRequest}
                            >
                                Request to Join
                            </button>
                        </div>
                    )}
                    {isRequested && (
                        <div className="alert alert-info">
                            Your join request is pending
                        </div>
                    )}
                    {user && user.user_id === group.owner_id && joinRequests.length > 0 && (
                        <div className="mt-4">
                            <h5 style={{ color: '#FFD700' }}>Join Requests</h5>
                            <div className="list-group">
                                {joinRequests.map(request => (
                                    <div key={request.request_id} 
                                         className="list-group-item" 
                                         style={{ backgroundColor: '#2A2A2A', color: 'white', border: '1px solid #444' }}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>{request.first_name} {request.last_name}</span>
                                            <div>
                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => handleRequestResponse(request.request_id, 'accept')}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleRequestResponse(request.request_id, 'reject')}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {isMember && (
                        <div className="mb-4">
                            <button 
                                className="btn btn-primary"
                                onClick={() => setShowAddMovieModal(true)}
                            >
                                Add Movie
                            </button>
                        </div>
                    )}
                    <div className="mt-0">
                        <h3 style={{ 
                            color: '#FFD700'
                        }}>Group Movies</h3>
                        <div className="row">
                            {groupMovies.map((groupMovie) => (
                                <div key={groupMovie.group_movie_id} className="col-md-4 mb-4">
                                    <div className="card" style={{ backgroundColor: '#2A2A2A' }}>
                                        <div onClick={() => navigate(`/movie/${groupMovie.tmdb_id}`)}
                                             style={{ cursor: 'pointer' }}>
                                            <img 
                                                src={`https://image.tmdb.org/t/p/w500${groupMovie.details.poster_path}`}
                                                className="card-img-top"
                                                alt={groupMovie.details.title}
                                            />
                                            <div className="card-body text-white">
                                                <h5 className="card-title" style={{ color: '#FFD700' }}>
                                                    {groupMovie.details.title}
                                                </h5>
                                                <p className="card-text">
                                                    Added by: {groupMovie.first_name} {groupMovie.last_name}
                                                </p>
                                                <small className="text-muted">
                                                    Added on: {new Date(groupMovie.added_at).toLocaleDateString()}
                                                </small>
                                            </div>
                                        </div>
                                        {(user?.user_id === group.owner_id || user?.user_id === groupMovie.added_by) && (
                                            <div className="card-footer" style={{ backgroundColor: '#222' }}>
                                                <button
                                                    className="btn btn-danger btn-sm w-100"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveMovie(groupMovie.group_movie_id);
                                                    }}
                                                >
                                                    Remove Movie
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="group-showtimes-section mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 style={{ color: '#FFD700' }}>Group Showtimes</h3>
                            {isMember && (
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => {
                                        fetchAvailableShowtimes();
                                        setShowAddShowtimeModal(true);
                                    }}
                                >
                                    Add Showtime
                                </button>
                            )}
                        </div>
                        <div className="showtimes-container">
                            {groupShowtimes.map((showtime) => (
                                <div key={showtime.showtime_id} className="showtime-wrapper">
                                    <div style={{ position: 'relative' }}>
                                        <ShowtimeCard
                                            startTime={new Date(showtime.start_time).toLocaleString()}
                                            endTime={new Date(showtime.end_time).toLocaleString()}
                                            movieTitle={showtime.movie_title}
                                            theaterLocation={showtime.theatre}
                                            posterUrl={moviePosters[showtime.movie_title]}
                                        />
                                        {isMember && (
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    right: '10px',
                                                    zIndex: 1
                                                }}
                                                onClick={() => removeShowtime(showtime.showtime_id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        )}
                                        <p className="added-by-text">
                                            Added by: {showtime.first_name} {showtime.last_name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {showAddMovieModal && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ backgroundColor: '#2A2A2A', color: 'white' }}>
                        <h2 style={{ color: '#FFD700' }}>Add Movie to the Group</h2>
                        <form onSubmit={handleAddMovie}>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter TMDB Movie ID"
                                value={movieId}
                                onChange={(e) => setMovieId(e.target.value)}
                                required
                                style={{ 
                                    backgroundColor: '#ffffff', 
                                    color: '#000000',
                                    border: '1px solid #444',
                                    padding: '8px 12px',
                                    width: '100%',
                                    borderRadius: '4px'
                                }}
                            />
                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary">
                                    Add Movie
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowAddMovieModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showAddShowtimeModal && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ 
                        backgroundColor: '#2A2A2A', 
                        color: 'white', 
                        maxHeight: '80vh', 
                        overflowY: 'auto',
                        width: '80%',
                        maxWidth: '1200px',
                        margin: 'auto',
                        position: 'relative'
                    }}>
                        <button
                            className="btn btn-danger"
                            onClick={() => setShowAddShowtimeModal(false)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '10px',
                                padding: '5px 10px',
                                fontSize: '20px',
                                lineHeight: '1',
                                background: 'none',
                                border: 'none'
                            }}
                        >
                            x
                        </button>
                        <h2 style={{ color: '#FFD700', marginBottom: '20px' }}>Add Showtime to the Group</h2>
                        <div className="showtimes-list" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '20px',
                            padding: '20px'
                        }}>
                            {availableShowtimes.map((showtime) => (
                                <div key={showtime.id} className="showtime-item p-3 mb-2 border rounded" 
                                     style={{ 
                                         display: 'flex',
                                         flexDirection: 'column',
                                         alignItems: 'center',
                                         textAlign: 'center'
                                     }}>
                                    <img 
                                        src={showtime.posterUrl || 'https://via.placeholder.com/150x225'} 
                                        alt={showtime.title}
                                        style={{
                                            width: '150px',
                                            height: '225px',
                                            objectFit: 'cover',
                                            marginBottom: '10px',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <h5>{showtime.title}</h5>
                                    <p>Theatre: {showtime.theatre}</p>
                                    <p>Start: {new Date(showtime.startTime).toLocaleString()}</p>
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => {
                                            addShowtimeToGroup(showtime);
                                            setShowAddShowtimeModal(false);
                                        }}
                                    >
                                        Add This Showtime
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 