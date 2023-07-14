import React, { useState } from 'react'
import './styles/home.scss'
import ex1 from './exData/example1.json'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

const Home = () => {
    const [filterOption, setFilterOption] = useState('')
    const [sortOption, setSortOption] = useState('');

    const availableCategories = ex1.map((category) => category.category)

    const filteredEx1 = ex1.filter((categories) => {
        if (filterOption === '')
            return true
        return categories.category === filterOption;
    }).map((categories) => {
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
                        <option value="">All</option>
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
                        <option value="">None</option>
                        <option value="title">Title</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            </div>

            <div className='storyList'>
                {filteredEx1.map((categories, index) => (
                    <div key={index}>
                        <h3>{categories.category}</h3>
                        {[index] && (
                            <section className='items'>
                                {
                                    categories.blogs.map((blogs) => (
                                        <div className='card' key={blogs.id}>
                                            <div className='card-content'>
                                                <h5 className='card-title'>{blogs.title}</h5>
                                                <p className='card-body'>{blogs.summary}</p>
                                                <div className='btns'>
                                                    <button className='btn-delete'><AiFillDelete /></button>
                                                    <button className='btn-edit'><AiFillEdit /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </section>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Home