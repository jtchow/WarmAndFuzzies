import React from 'react';
import "./Logout.css";


class Logout extends React.Component
{

    componentDidMount(){
        this.props.cookies.remove('user', {path: '/'});
    }

    render()
    {
        return (
            <div className = "logout">
            <h1>You have been logged out</h1>

            </div>
        );
    }
}

export default Logout;