import React from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import useFetch from './useFetch'

const jsonServerURL = 'https://bedecked-elastic-whippet.glitch.me/server';

const StoryPage = () => {
    const { id } = useParams();
    const { data: storyData, loading, error } = useFetch(`${jsonServerURL}/${id}`);
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleClick = () => {
        navigate('/')
    }

    return (
        <div className='story-content'>
            <h2>{storyData.title}</h2>
            <div>{storyData.body}</div>
            <button onClick={handleClick}>Click</button>
        </div>
    )
}

export default StoryPage