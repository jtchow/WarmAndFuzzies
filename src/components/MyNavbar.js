import React from 'react';
import { Link } from 'react-router-dom';
import "./MyNavbar.css";
import {useCookies} from 'react-cookie';

const MyNav = (props) => {
    const [cookies] = useCookies(['user']);

    // unathenticated links
    const signUpLink = (<Link to="/signup" className="nav-link navbar-tem" id="profile-link">Sign Up</Link>);
    const loginLink = (<Link to="/login" className="nav-link navbar-tem" id="profile-link">Log In</Link>);
    
    // authenticated links
    const profileLink = (<Link to="/user-profile" className="nav-link navbar-tem" id="profile-link">My Profile</Link>);
    const logoutLink = ( <Link to = "/logout"  className = "nav-link navbar-tem" id = "profile-link">Logout</Link>);
    const writeLink = (<Link to="/write" className = "nav-link navbar-tem">Write Note</Link>);
    const viewLink = (<Link to="/bag/view" className = "nav-link navbar-tem">View My Bag</Link>);
    
    return (
        <nav className="navbar navbar-custom navbar-light navbar-expand-lg ">
            <Link to="/" className="navbar-brand">Warm&Fuzzies</Link>
            <div className="collpase navbar-collapse">
                <ul className = "navbar-nav mr-auto">
                   {cookies.user && writeLink}
                   {cookies.user && viewLink}
                </ul>
                <ul className="navbar-nav navbar-right">
                    {cookies.user && profileLink}
                   {cookies.user && logoutLink}
                   
                   {!cookies.user && signUpLink}
                   {!cookies.user &&loginLink}
                </ul>
            </div>
        </nav>
    );

    
}

export default MyNav;
   
