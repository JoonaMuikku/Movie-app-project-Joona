import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { fetchMovieDetails } from "../api/movieApi";

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

  
    const fetchGroupDetails = useCallback(async () => {
        try {   
            const response = await axios.get(
                //'http://localhost:3001/api/groups/${id}'
                `http://localhost:3001/api/groups/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
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
    },[token, id]);

    const fetchPendingRequests = useCallback(async () => {
        if (!user || user.user_id !== group?.owner_id) return;
        
        try {
            const response = await axios.get(
                //'http://localhost:3001/api/groups/${id}'
                `http://localhost:3001/api/groups/${id}/requests`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setJoinRequests(response.data.requests);
        } catch (error) {
            console.error('Failed to fetch pending requests:', error);
        }
    }, [token, id, group?.owner_id, user]);

    const fetchGroupMovies = useCallback(async () => {
        try {
            const response = await axios.get(
                //'http://localhost:3001/api/groups/${id}'
                `http://localhost:3001/api/groups/${id}/movies`,
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
    }, [token, id]);
        useEffect(() => {
        if (user && token) {
            fetchGroupDetails();
            fetchGroupMovies();
            if (group && user.user_id === group.owner_id) {
                fetchPendingRequests();
            }
        }
    }, [group ,id, user, token, group?.owner_id, fetchGroupDetails, fetchGroupMovies, fetchPendingRequests]);

    const handleDeleteGroup = async () => {
        if (!window.confirm('Are you sure you want to delete this group?')) return;

        try {
            await axios.delete(
                //'http://localhost:3001/api/groups/${id}'
                `http://localhost:3001/api/groups/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Group deleted successfully');
            navigate('/groups');
        } catch (error) {
            toast.error('Failed to delete group');
        }
    };

    const handleJoinRequest = async () => {
        try {
            await axios.post(
                //'http://localhost:3001/api/groups/${id}'
                `http://localhost:3001/api/groups/${id}/join`,
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
                //'http://localhost:3001/api/groups/${id}'
                `http://localhost:3001/api/groups/requests/${requestId}`,
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
                //'http://localhost:3001/api/groups/${id}'
                `http://localhost:3001/api/groups/${id}/leave`,
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
                //'http://localhost:3001/api/groups/${id}'
                `http://localhost:3001/api/groups/${id}/movies`,
                { tmdb_id: movieId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Movie added to group successfully");
            setShowAddMovieModal(false);
            setMovieId("");
            fetchGroupMovies();
        } catch (error) {
            toast.error("Failed to add movie to group");
        }
    };

    const handleRemoveMovie = async (movieId) => {
        if (!window.confirm('Are you sure you want to remove this movie?')) return;
        
        try {
            await axios.delete(
                //'http://localhost:3001/api/groups/${id}'
                `http://localhost:3001/api/groups/${id}/movies/${movieId}`,
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
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h2>{group.group_name}</h2>
                    {user && user.user_id === group.owner_id && (
                        <button 
                            className="btn btn-primary"
                            onClick={() => navigate(`/groups/${id}/admin`)}
                        >
                            Admin Panel
                        </button>
                    )}
                </div>
                <div className="card-body">
                    <h5>Group Owner</h5>
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
                    {user && isMember && user.user_id !== group.owner_id && (
                        <button 
                            className="btn btn-danger"
                            onClick={handleLeaveGroup}
                        >
                            Leave Group
                        </button>
                    )}
                    {user && user.user_id === group.owner_id && joinRequests.length > 0 && (
                        <div className="mt-4">
                            <h5>Join Requests</h5>
                            <div className="list-group">
                                {joinRequests.map(request => (
                                    <div key={request.request_id} className="list-group-item">
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
                    <div className="mt-4">
                        <h3>Group Movies</h3>
                        <div className="row">
                        {groupMovies.map((groupMovie) => (
    <div 
        key={groupMovie.group_movie_id} 
        className="col-md-4 mb-4"
    >
        <div className="card">
            <div 
                onClick={() => navigate(`/movie/${groupMovie.tmdb_id}`)}
                style={{ cursor: 'pointer' }}
            >
                <img 
                    src={`https://image.tmdb.org/t/p/w500${groupMovie.details.poster_path}`}
                    className="card-img-top"
                    alt={groupMovie.details.title}
                />
                <div className="card-body">
                    <h5 className="card-title">{groupMovie.details.title}</h5>
                    <p className="card-text">
                        Added by: {groupMovie.first_name} {groupMovie.last_name}
                    </p>
                    <small className="text-muted">
                        Added on: {new Date(groupMovie.added_at).toLocaleDateString()}
                    </small>
                </div>
            </div>
            {(user?.user_id === group.owner_id || user?.user_id === groupMovie.added_by) && (
                <div className="card-footer">
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
                </div>
            </div>
            {showAddMovieModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add Movie to Group</h2>
                        <form onSubmit={handleAddMovie}>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Enter TMDB Movie ID"
                                value={movieId}
                                onChange={(e) => setMovieId(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary">
                                Add Movie
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary ms-2"
                                onClick={() => setShowAddMovieModal(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 