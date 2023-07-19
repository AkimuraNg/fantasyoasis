import React, { useState, useEffect } from 'react'
import './styles/home.scss'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

const jsonServerURL = 'https://bedecked-elastic-whippet.glitch.me/server'

const Home = () => {
    const [filterOption, setFilterOption] = useState('')
    const [sortOption, setSortOption] = useState('');
    const [categoriesData, setCategoriesData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(jsonServerURL);
            if (response.ok) {
                const data = await response.json();
                setCategoriesData(data);
            } else {
                console.log('Error fetching data from the server.');
            }
        } catch (error) {
            console.log('Error fetching data from the server:', error);
        }
    };

    const availableCategories = categoriesData.map((category) => category.category)

    const filteredCategories = categoriesData
        .filter((categories) => {
            if (filterOption === '') return true;
            return categories.category === filterOption;
        })
        .map((categories) => {
            const sortedBlogs = [...categories.blogs];
            if (sortOption === 'title') {
                sortedBlogs.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOption === 'date') {
                sortedBlogs.sort((a, b) => new Date(a.date) - new Date(b.date));
            }
            return { ...categories, blogs: sortedBlogs };
        });

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
                {filteredCategories.map((categories, index) => (
                    <div key={index}>
                        <h3>{categories.category}</h3>
                        {[index] && (
                            <section className='items'>
                                {categories.blogs.map((blogs) => (
                                    <div className='card' key={blogs.id}>
                                        <div className='card-content'>
                                            <h5 className='card-title'>{blogs.title}</h5>
                                            <div className='btns'>
                                                <button className='btn-delete'>
                                                    <AiFillDelete />
                                                </button>
                                                <button className='btn-edit'>
                                                    <AiFillEdit />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home