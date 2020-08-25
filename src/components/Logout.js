import React from 'react';
import "./Logout.css";
import axios from 'axios';


class Logout extends React.Component {

    componentDidMount() {
        axios.get("http://localhost:5000/logout",
            { withCredentials: true }
        )
            .then((response) => {
                console.log(response);
                this.props.cookies.remove('user', { path: '/' });
            })
            .catch((error) => {
                console.log("something didn't work");
                console.log(error);
            })
        this.props.cookies.remove('user', { path: '/' });

    }

    render() {
        return (
            <div className="logout">
                <h1>You have been logged out</h1>

            </div>
        );
    }
}

export default Logout;