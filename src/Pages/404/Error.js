import React from 'react'
import { FaCopyright } from "react-icons/fa";
import './404.css'
import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className='Error'>
            <div className="container">
                <div className="dark-layer"></div>
                <div className="text-big">
                    <h1>404</h1>
                </div>
                <div className="info">
                    <h2>We can't find <span>that page</span></h2>
                    <p>We're pretty sure <span>that page</span> used to be here but seems to have gone missing. We apologize on behalf of <span>that page</span>.</p>
                    <Link to='/'>Home</Link>
                </div>
                <footer>Powered by <a href="https://vercel.com/encrtptfirm" target="blank">E|NCRYPT</a><FaCopyright />2 0 2 4</footer>
            </div>
        </div>
    )
}

export default Error