import React from 'react';
import { Link } from 'react-router-dom';
import "./MyNavbar.css";


const MyNav = () => {
    const authEmail = "Hi"; // this should be set to the session email if there is one

    var profileLink = ( <li className="navbar-item">
                        <Link to="/user-profile" className="nav-link" id="profile-link">My Profile</Link>
                    </li>);
    
    var signUpLink = ( <li className="navbar-item">
                         <Link to="/signup" className="nav-link" id="profile-link">Sign Up</Link>
                        </li>);

    var loginLink = (<li  className = "navbar-item">
                        <Link to="/login" className="nav-link" id="profile-link">Log In</Link>
                    </li>);

    var logoutLink = (<li className = "navbar-item">
        <Link to = "/logout" className = "nav-link" id = "profile-link">Logout</Link>
        </li>);

    var writeLink = ( <li className = "navbar-item">
                            <Link to="/write" className = "nav-link">Write Note</Link>
                    </li>);
    var viewLink = (<li className = "navbar-item">
                        <Link to="/bag/view" className = "nav-link">View My Bag</Link>
                    </li>);
    
    return (
        <nav className="navbar navbar-custom navbar-light navbar-expand-lg ">
            <Link to="/" className="navbar-brand">Warm&Fuzzies</Link>
            <div className="collpase navbar-collapse">
                <ul className = "navbar-nav mr-auto">
                   {authEmail && writeLink}
                   {authEmail && viewLink}
                </ul>
                <ul className="navbar-nav navbar-right">
                    {authEmail && profileLink}
                   {authEmail && logoutLink}
                   
                   {authEmail && signUpLink}
                   {authEmail &&loginLink}
                </ul>
            </div>
        </nav>
    );

    
}

export default MyNav;
   
