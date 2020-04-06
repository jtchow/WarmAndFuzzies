import React from 'react';
import { Link } from 'react-router-dom';


export default class MyNav extends React.Component 
{
    render()
    {
        return (
            <nav className="navbar navbar-light bg-light navbar-expand-lg" style={{backgroundColor: "#f0f6fc"}}>
                <Link to="/" className="navbar-brand">Warm&Fuzzies</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="navbar-item">
                        <Link to="/user-profile" className="nav-link">My Profile</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}