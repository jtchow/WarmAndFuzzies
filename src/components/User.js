import React from 'react';

export default class UserView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            //test profile
            username: "aahirata@uci.edu",
            first: "Annie",
            last: "Hirata",
        }
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