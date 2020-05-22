import React from 'react';
import "./EditUser.css";
import axios from 'axios';
import {withRouter} from 'react-router';

 class EditUserView extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: this.props.cookies.get('user'),
            first: "",
            last: ""
        }

        this.handleFirstChange = this.handleFirstChange.bind(this);
        this.handleLastChange = this.handleLastChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:5000/user', {          
            params: {email: this.state.username}
        })
            .then(response => {
                this.setState({
                    first: response.firstName,
                    last: response.lastName
                })
            })
    }

    handleFirstChange(event)
    {
        this.setState({
            first: event.target.value
        });
    }

    handleLastChange(event)
    {
        this.setState({
            last: event.target.value
        });
    }
    
    handleSubmit(event)
    {
        event.preventDefault();
        
        axios.post("http://localhost:5000/user/update", null, {
            params: {
                email: this.state.username,
                first: this.state.first,
                last: this.state.last
            }  
        })
        .then(res => console.log(res.data));

        //if successful, reroute to user profile page

        this.props.history.push('/user-profile');
    }

    handleCancel(event)
    {
        event.preventDefault();
        this.props.history.push('/user-profile');
    }

    render()
    {
        return (
            <div id="edit-user-profile">
                <h3 style={{marginBottom: "4%"}}>Edit Profile</h3>
                <form id="edit-user-form" onSubmit={this.handleSubmit}>
                    <div id="edit-input-container">
                    <label className="edit-label">First Name</label>
                    <input className="form-control edit-input" value={this.state.first} onChange={this.handleFirstChange}></input>
                    <label className="edit-label">Last Name</label>
                    <input className="form-control edit-input" value={this.state.last} onChange={this.handleLastChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2" id="profile-save-button">Save</button>
                    <button type="button" className="btn btn-primary mb-2" id="profile-cancel-button" onClick={this.handleCancel}>Cancel</button>
                </form>
            </div>
        );
    }
}

export default withRouter(EditUserView);