import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function GroupsView() {
    const [groups, setGroups] = useState([]);
    const [newGroupName, setNewGroupName] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const { user, token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await axios.get(
                //'http://localhost:3001/api/groups/${id}'
                'http://localhost:3001/api/groups');
            setGroups(response.data.groups);
        } catch (error) {
            console.error('Error fetching groups:', error);
            toast.error('Failed to fetch groups');
        }
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please sign in to create a group');
            return;
        }

        try {
            await axios.post(
                //'http://localhost:3001/api/groups/${id}'
                'http://localhost:3001/api/groups/create',
                { group_name: newGroupName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Group created successfully');
            setNewGroupName('');
            setShowCreateForm(false);
            fetchGroups();
        } catch (error) {
            toast.error('Failed to create group');
        }
    };

    const handleDeleteGroup = async (groupId) => {
        try {
            await axios.delete(
                //'http://localhost:3001/api/groups/${id}'
                `http://localhost:3001/api/groups/${groupId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Group deleted successfully');
            fetchGroups();
        } catch (error) {
            toast.error('Failed to delete group');
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Groups</h1>
                {user && (
                    <button
                        className="btn btn-orange"
                        onClick={() => setShowCreateForm(!showCreateForm)}
                    >
                        {showCreateForm ? 'Cancel' : 'Create New Group'}
                    </button>
                )}
            </div>

            {showCreateForm && (
                <form onSubmit={handleCreateGroup} className="mb-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter group name"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-orange">
                            Create
                        </button>
                    </div>
                </form>
            )}

            <div className="row">
                {groups.map((group) => (
                    <div key={group.group_id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{group.group_name}</h5>
                                <p className="card-text">
                                    Owner: {group.first_name} {group.last_name}
                                    <br />
                                    Members: {group.member_count}
                                </p>
                                {user && user.user_id !== group.owner_id && (
                                    <button
                                        className="btn btn-primary mb-2"
                                        onClick={() => navigate(`/groups/${group.group_id}`)}
                                    >
                                        Join Group
                                    </button>
                                )}
                                <div className="d-flex justify-content-between">
                                    {user && (user.user_id === group.owner_id || group.is_member) && (
                                        <button
                                            className="btn btn-orange"
                                            onClick={() => navigate(`/groups/${group.group_id}`)}
                                        >
                                            View Group
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
