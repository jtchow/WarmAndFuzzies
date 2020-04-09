import React from 'react';
import { Link } from 'react-router-dom';
import "./MyNavbar.css";


export default class MyNav extends React.Component 
{
    render()
    {
        return (
            <nav className="navbar navbar-custom navbar-light navbar-expand-lg ">
                <Link to="/" className="navbar-brand">Warm&Fuzzies</Link>
                <div className="collpase navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li className = "navbar-item">
                            <Link to="/write" className = "nav-link">Write Note</Link>
                        </li>
                        <li className = "navbar-item">
                            <Link to="/bag/view" className = "nav-link">View My Bag</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-right">
                        <li className="navbar-item">
                            <Link to="/user-profile" className="nav-link" id="profile-link">My Profile</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );

    }
}