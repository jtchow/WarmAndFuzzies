import React from 'react';
import axios from 'axios';
import './EditUser.css';

export default class UserView extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            //test profile
            email: this.props.cookies.get('user'),
            first: "",
            last: "",
            picture: null
        }

        this.loadPicture = this.loadPicture.bind(this); 
    }

    // create thisWillMount method to set up the state using information from database
    // will get user data using id from session and get username, Name for the component to display
    componentDidMount(){
        axios.get('http://localhost:5000/user', {          
            params: {email: this.state.email}
        })
            .then(response => {
                this.setState({
                    username: response.data.email,
                    first: response.data.firstName,
                    last: response.data.lastName
                })
            })
            .catch( (error)=>{
                alert("unable to load user information. Please refresh the page")
            })
        this.loadPicture().then(pic => this.setState({picture: pic})).catch(err => console.log(err))

    }

    // load's user's profile picture, uses default picture if there is none
    loadPicture = async () => {
        // make a call to get the profile picture
        const response = await axios.get('http://localhost:5000/user/profile-pic?email=' + this.state.email)
        if (response.status === 200){ // found picture
            console.log("found picture")
            return (<img src = {'http://localhost:5000/user/profile-pic?email=' + this.state.email}></img>)
        }
        else{ // no pic, use default
            return (<img alt = "default not found" src = {process.env.PUBLIC_URL + '/default_pic.png'}/>)
        }
    }

    render()
    {
        return (
            <div className="container" id="user-profile">
                <div className="profile-picture">
                    {this.state.picture}
                </div>
                <div id="profile-text-container">
                    <h2>Profile</h2>
                    <h4>Name: {this.state.first + " " + this.state.last}</h4>
                    <h5>Email: {this.state.email}</h5>
                    <br />
                    <a className = "btn" href = "/user-profile/edit" id="edit-profile-button" className="btn btn-primary mb-2">Edit Profile</a>
                </div>
            </div>
        )
    }
}