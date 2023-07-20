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

    useEffect(() => {
        setStoryData(initialStoryData);
    }, [initialStoryData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleClick = () => {
        navigate('/')
    }

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        try {
            // Make a fetch request to update the data on the server
            const response = await fetch(`${jsonServerURL}/${id}`, {
                method: 'PUT', // Use 'PUT' method for updating data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(storyData), // Convert the storyData object to JSON
            });

            if (response.ok) {
                // If the update is successful, setEditing to false to exit edit mode
                setEditing(false);
            } else {
                // Handle error cases, such as server errors or validation errors
                console.error('Error updating story data:', response.statusText);
            }
        } catch (error) {
            // Handle network errors or other unexpected errors
            console.error('Error updating story data:', error.message);
        }
    };

    const handleCancel = () => {
        // Reset the storyData to the initial state to cancel the edit
        setStoryData(initialStoryData);
        setEditing(false);
    };

    return (
        <div className='story-content'>
            <h2>{storyData.title}</h2>
            <div className='story-body'>
                {!editing && <div className='story'>{storyData.body}</div>}
                {editing ? (
                    <textarea
                        value={storyData.body}
                        onChange={(e) => setStoryData({ ...storyData, body: e.target.value })}
                    />
                ) : null}
                {editing ? (
                    <div className='SaveandEdit'>
                        <button onClick={handleSave} className='SaveBtn'>Save</button>
                        <button onClick={handleCancel} className='CancelBtn'>Cancel</button>
                    </div>
                ) : (
                    <button onClick={handleEdit} className='EditBtn'>Edit</button>
                )}
                <button onClick={handleClick}>Click</button>
            </div>
        </div>
    )
}

export default StoryPage