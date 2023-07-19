import React, { useState, useEffect } from 'react';
import './styles/compose.scss'
import useFetch from './useFetch';
// import { useNavigate } from 'react-router-dom';

const jsonServerURL = 'https://bedecked-elastic-whippet.glitch.me/server';

function Compose() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [savedStoryData, setSavedStoryData] = useState(null);
  // const navigate = useNavigate()

  const { data: savedStoryDataFromServer } = useFetch(jsonServerURL);

  useEffect(() => {
    // Update state when data is fetched from the server
    if (savedStoryDataFromServer) {
      setSavedStoryData(savedStoryDataFromServer);
      setTitle(savedStoryDataFromServer?.title || '');
      setBody(savedStoryDataFromServer?.body || '');
      setAuthor(savedStoryDataFromServer?.author || '');
      setCategory(savedStoryDataFromServer?.category || '');
    }
  }, [savedStoryDataFromServer]);

  const edit = (field, value) => {
    switch (field) {
      case 'title':
        setTitle(value);
        break;
      case 'body':
        setBody(value);
        break;
      case 'author':
        setAuthor(value);
        break;
      case 'category':
        setCategory(value);
        break;
      default:
        break;
    }
  };
  // Function to fetch data from the server after saving
  const fetchDataAfterSave = async () => {
    try {
      const response = await fetch(jsonServerURL);
      if (response.ok) {
        const data = await response.json();
        setSavedStoryData(data);
        setIsEditMode(false);
      } else {
        console.log('Error fetching data from the server.');
      }
    } catch (error) {
      console.log('Error fetching data from the server:', error);
    }
  };
  const handleSaveClick = async () => {
    const storyData = {
      title,
      body,
      author,
      category: category.trim() !== '' ? category : 'other',
    };
    try {
      const response = await fetch(jsonServerURL, {
        method: savedStoryData ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData),
      });
  
      if (!response) {
        console.log('Error: No response from the server.');
        return;
      }
  
      if (response.ok) {
        fetchDataAfterSave(); // Fetch data after successful save
      } else {
        console.log('Error saving data to the server.');
      }
    } catch (error) {
      console.log('Error saving data to the server:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  return (
    <div className='compose'>
      Write your stories
      {isEditMode ? (
        <>
          <input
            type='text'
            value={title}
            onChange={(e) => edit('title', e.target.value)}
            placeholder='Enter story title...'
          />

          <textarea
            value={body}
            onChange={(e) => edit('body', e.target.value)}
            placeholder='Write your story here...'
          />

          <input
            type='text'
            value={author}
            onChange={(e) => edit('author', e.target.value)}
            placeholder='Enter author name...'
          />

          <input
            type='text'
            value={category}
            onChange={(e) => edit('category', e.target.value)}
            placeholder='Enter category...'
          />

          <button onClick={handleSaveClick}>Save Story</button>
        </>
      ) : savedStoryData ? (
        <>
          <h2>{savedStoryData.title}</h2>
          <p>{savedStoryData.body}</p>
          <p>By: {savedStoryData.author}</p>
          <p>Category: {savedStoryData.category}</p>

          <button onClick={handleEditClick}>Edit</button>
        </>
      ) : (
        <>
          <h2 onClick={() => setIsEditMode(true)}>{title || 'Click to Edit Title'}</h2>
          <p onClick={() => setIsEditMode(true)}>{body || 'Click to Edit Body'}</p>
          <p onClick={() => setIsEditMode(true)}>{author || 'Click to Edit Author'}</p>
          <p onClick={() => setIsEditMode(true)}>Enter a category</p>
        </>
      )}
    </div>
  );
}

export default Compose;
