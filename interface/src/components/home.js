import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/home.scss'
import useFetch from './useFetch'
// import { AiFillForward} from 'react-icons/ai'

const jsonServerURL = 'https://bedecked-elastic-whippet.glitch.me/server'

const Home = () => {
    const [filterOption, setFilterOption] = useState('');
    const [sortOption, setSortOption] = useState('');


    const queryParams = filterOption ? `?category=${filterOption}` : '';
    const { data: categoriesData, loading, error } = useFetch(jsonServerURL, queryParams);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    const availableCategories = Array.from(new Set(categoriesData.map((category) => category.category)));

    const filteredCategories = availableCategories
        .filter((category) => {
            if (filterOption === '') return true;
            return category === filterOption;
        })
        .map((category) => ({
            category: category,
            Server: categoriesData.filter((item) => item.category === category),
        }));

    // Sort the stories within each category if needed
    filteredCategories.forEach((category) => {
        if (sortOption === 'title') {
            category.Server.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === 'date') {
            category.Server.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
    });

    const handleToStoryClick = () => {
        window.scrollTo(0, 0); // Scrolls to the top of the page
    };

    return (
        <div className='home'>
            <div className='FiltersandSort'>
                <div className='filterOpts'>
                    <label>Filter by Category:</label>
                    <select className='filterSelect' value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                        <option value=''>All</option>
                        {availableCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='sortOpts'>
                    <label>Sort by:</label>
                    <select className='sortSelect' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value=''>None</option>
                        <option value='title'>Title</option>
                        <option value='date'>Date</option>
                    </select>
                </div>
            </div>

            <div className='storyList'>
                {filteredCategories.map((category, index) => (
                    <div key={index}>
                        <Link to={`category/${category.category}`} onClick={handleToStoryClick}>
                            <h3>{category.category}</h3>
                        </Link>
                        <section className='items'>
                            {category.Server.map((story) => (
                                <div className='card' key={story.id}>
                                    <div className='card-content'>
                                        <h5 className='card-title'>{story.title}</h5>
                                        {/* <div className='btns'>
                                            <button className='btn-delete'>
                                                <AiFillDelete />
                                            </button>
                                            <button className='btn-edit'>
                                                <AiFillEdit />
                                            </button>
                                        </div> */}
                                        <Link to={`server/${story.id}`} onClick={handleToStoryClick}>To Story</Link>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home