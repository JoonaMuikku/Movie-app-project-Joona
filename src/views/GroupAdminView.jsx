import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function GroupAdminView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useAuth();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);

 // Use useCallback to ensure fetchGroupDetails is stable
    const fetchGroupDetails = useCallback(async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/groups/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.group.owner_id !== user.user_id) {
                toast.error("Access denied");
                navigate(`/groups/${id}`);
                return;
            }

            setGroup(response.data.group);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to fetch group details");
            navigate(`/groups/${id}`);
        }
    }, [id, token, user.user_id, navigate]);

    useEffect(() => {
        fetchGroupDetails();
    }, [fetchGroupDetails]);

    const handleRemoveMember = async (memberId) => {
        if (!window.confirm('Are you sure you want to remove this member?')) return;
        try {
            await axios.delete(
                `${API_BASE_URL}/groups/${id}/members/${memberId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Member removed successfully');
            fetchGroupDetails();
        } catch (error) {
            toast.error('Failed to remove member');
        }
    };

    const handleDeleteGroup = async () => {
        if (!window.confirm('Are you sure you want to delete this group?')) return;
        try {
            await axios.delete(
                `${API_BASE_URL}/groups/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Group deleted successfully');
            navigate('/groups');
        } catch (error) {
            toast.error('Failed to delete group');
        }
    };

    if (loading) return <div className="container mt-5"><h2>Loading...</h2></div>;

    return (
        <div className="container mt-5">
            <div className="card" style={{ backgroundColor: '#2A2A2A' }}>
                <div className="card-header">
                    <h2 style={{ color: '#FFD700' }}>{group.group_name} Admin Panel</h2>
                </div>
                <div className="card-body text-white">
                    <h3 style={{ color: '#FFD700' }}>Members</h3>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {group.members.map(member => (
                                <tr key={member.user_id}>
                                    <td>{member.first_name} {member.last_name}</td>
                                    <td>{member.user_id === group.owner_id ? 'Owner' : 'Member'}</td>
                                    <td>
                                        {member.user_id !== group.owner_id && (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleRemoveMember(member.user_id)}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div className="mt-4 d-flex justify-content-between">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/groups/${id}`)}
                        >
                            Back to Group
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={handleDeleteGroup}
                        >
                            Delete Group
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 