import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from './useFetch'
import './styles/storyPage.scss'

const jsonServerURL = 'https://bedecked-elastic-whippet.glitch.me/server';

const StoryPage = () => {
    const { id } = useParams();
    const { data: initialStoryData, loading, error } = useFetch(`${jsonServerURL}/${id}`);
    const navigate = useNavigate();

    const [storyData, setStoryData] = useState(initialStoryData);
    const [editing, setEditing] = useState(false);
    const [editedStoryData, setEditedStoryData] = useState({}); // New state to store temporary edits

    useEffect(() => {
        setStoryData(initialStoryData);
        setEditedStoryData(initialStoryData); // Initialize editedStoryData when initialStoryData changes
    }, [initialStoryData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleClick = () => {
        navigate('/');
    };

    const handleEdit = () => {
        setEditedStoryData(storyData);
        setEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedStoryData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${jsonServerURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedStoryData),
            });

            if (response.ok) {
                // Update the storyData state with editedStoryData after a successful save
                setStoryData(editedStoryData);
                setEditing(false);
            } else {
                console.error('Error updating story data:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating story data:', error.message);
        }
    };

    const handleCancel = () => {
        setEditedStoryData(storyData);
        setEditing(false);
    };

    return (
        <div className='story-content'>
            <h2>{storyData.title}</h2>
            <h5>Written by: {storyData.author}</h5>
            <div className='story-body'>
                {!editing && <div className='story'>{storyData.body}</div>}
                {editing ? (
                    <textarea
                        name='body' // Assuming 'body' is the field you want to edit
                        value={editedStoryData.body || ''}
                        onChange={handleChange}
                    />
                ) : null}
                {editing ? (
                    <div className='SaveandEdit'>
                        <button onClick={handleCancel} className='CancelBtn'>
                            Cancel
                        </button>
                        <button onClick={handleSave} className='SaveBtn'>
                            Save
                        </button>
                    </div>
                ) : (
                    <button onClick={handleEdit} className='EditBtn'>
                        Edit
                    </button>
                )}
                <button onClick={handleClick} className='ReturnBtn'>Return to Home</button>
            </div>
        </div>
    )
}

export default StoryPage