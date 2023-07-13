import React, { useState } from 'react'
import './styles/home.scss'
import ex1 from './exData/example1.json'

const Home = () => {
    const [filterOption, setFilterOption] = useState('')
    const availableCategories = ex1.map((category) => category.category)

    const filteredEx1 = ex1.filter((categories) => {
        if (filterOption === '')
            return true
        return categories.category === filterOption;
    })

    return (
        <div className='home'>
            <h1>Fantasy Oasis</h1>
            <p>Write your own fantasy novels</p>

            <div>
                <label>Filter by Category:</label>
                <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                    <option value="">All</option>
                    {availableCategories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {filteredEx1.map((categories, index) => (
                <div key={index}>
                    <h3>{categories.category}</h3>
                    {[index] && (
                        <section className='items'>
                            {
                                categories.blogs.map((blogs) => (
                                    <div className='card' key={blogs.id} style={{ width: '18rem' }}>
                                        <div className='card-content'>
                                            <h5 className='card-title'>{blogs.title}</h5>
                                            <p className='card-body'>{blogs.body}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </section>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Home