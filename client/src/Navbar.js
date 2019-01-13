import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = (props) => {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to = "/admin">Admin</Link>
            
            
        </div>
    )
}

export default Navbar