import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from './useFetch';
import './styles/categoryPage.scss'

const CategoryPage = () => {

    const { category } = useParams();
    const { data: stories, loading, error } = useFetch(`https://bedecked-elastic-whippet.glitch.me/server?category=${category}`);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className='categoryPage'>
        <h2>{category}</h2>
        <div className='pageItems'>
          {stories.map((story) => (
            <div key={story.id} className='card'>
              <h3 className='card-title'>{story.title}</h3>
              <Link to={`/server/${story.id}`}>To Story</Link>
              {/* <p>{story.body}</p> */}
            </div>
          ))}
        </div>
      </div>
    );
}

export default CategoryPage