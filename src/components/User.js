import React from 'react';
import axios from 'axios';

export default class UserView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            //test profile
            username: this.props.cookies.get('user'),
            first: "",
            last: "",
        }
    }

    // create thisWillMount method to set up the state using information from database
    // will get user data using id from session and get username, Name for the component to display
    componentDidMount(){
        axios.get('http://localhost:5000/user', this.props.cookies.get('user'))
            .then(response => {
                this.setState({
                    username: response.data.email,
                    first: response.data.firstName,
                    last: response.data.lastName
                })
                //console.log(response.data);
            })
            .catch(function (error){
                console.log(error);
            })
    }

    render()
    {
        return (
            <div className="container" id="user-profile">
                <div className="profile-picture"></div>
                <div id="profile-text-container">
                    <h2>Profile</h2>
                    <h4>Name: {this.state.first + " " + this.state.last}</h4>
                    <h5>Email: {this.state.username}</h5>
                    <br />
                    <form method="get" action="/user-profile/edit">
                        <button type="submit" id="edit-profile-button" className="btn btn-primary mb-2">Edit Profile</button>
                </form>
                </div>
            </div>
        )
    }
}