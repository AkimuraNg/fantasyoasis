import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/addNew.scss'

const jsonServerURL = 'https://bedecked-elastic-whippet.glitch.me/server';
const availableCategories = ['Action', 'Adventure', 'Romance', 'Horror'];


const AddNew = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [categoryError, setCategoryError] = useState('');


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;

        // Split the entered category by comma to get individual categories
        const categories = selectedCategory.split(',');

        // Get the first category
        const firstCategory = categories[0].trim();

        // Check if the first category is one of the available categories
        if (!availableCategories.includes(firstCategory)) {
            // If not, add it to the available categories list
            setCategory(firstCategory);
            availableCategories.push(firstCategory);
        } else {
            setCategory(firstCategory);
        }

        // Show an error message if the user has more than one category
        if (categories.length > 1) {
            setCategoryError('You can only select one category. The first category will be used.');
        } else {
            setCategoryError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(jsonServerURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category,
                    title,
                    body,
                    author,
                }),
            });

            if (response.ok) {
                // Redirect the user to the home page after successful submission
                navigate('/');
            } else {
                console.error('Error saving story:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving story:', error.message);
        }
    };


    return (
        <div className='addNew'>
            <h2>Create a New Story</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='title'>Title:</label>
                    <input type='text' id='title' value={title} onChange={handleTitleChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='body'>Body:</label>
                    <textarea id='body' value={body} onChange={handleBodyChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='author'>Author:</label>
                    <input type='text' id='author' value={author} onChange={handleAuthorChange} required />
                </div>
                <div className='form-group'>
                    <label htmlFor='category'>Category:</label>
                    <input
                        type='text'
                        id='category'
                        value={category}
                        onChange={handleCategoryChange}
                        required
                        placeholder='Enter category (e.g., Action, Fantasy)'
                    />
                    {categoryError && <p className='error-message'>{categoryError}</p>}
                </div>
                <button type='submit' className='addStory' disabled={!!categoryError}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default AddNew