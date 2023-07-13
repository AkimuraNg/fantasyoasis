import React from 'react'
import './styles/navbar.scss'
import {GiOpenBook} from 'react-icons/gi'

const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary sticky-top'>
            <div className='container'>
                <a className='navbar-brand' href='#'>
                    <GiOpenBook/>
                </a>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav justify-content-center flex-grow-1'>
                        <li className='nav-item'>
                            <a className='nav-link active' aria-current='page' href='#'>Home</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='#'>Link</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link' href='#'>Link</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar