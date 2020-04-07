import React from 'react';
import { Link } from 'react-router-dom';


export default class MyNav extends React.Component 
{
    render()
    {
        return (
            <div className="navbar-custom">
                <nav>
                    <Link to="/" className="navbar-brand">Warm&Fuzzies</Link>
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="navbar-item">
                                <Link to="/user-profile" className="nav-link" id="profile-link">My Profile</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}