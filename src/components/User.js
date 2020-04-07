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
                <h2>Name: {this.state.first + " " + this.state.last}</h2>
                <h3>Email: {this.state.username}</h3>
                <br />
                <form method="get" action="/user-profile/edit">
                    <button type="submit" id="edit-profile-button" className="btn btn-primary mb-2">Edit Profile</button>
                </form>
            </div>
        )
    }
}