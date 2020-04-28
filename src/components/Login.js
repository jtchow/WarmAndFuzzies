import React from 'react';
import "./Login.css";
import axios from 'axios';

export default class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: ""
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event)
    {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange(event)
    {
        this.setState({
            password: event.target.value
        });
    }
    
    handleSubmit(event)
    {
        event.preventDefault();

        console.log(this.state);

        const login = {
            email: this.state.email,
            password: this.state.password
        }

        // check information with database
        axios.post('http://localhost:5000/login', login)
            .then(res => console.log(res.data)); // might want to display what is sent back as error message? 
            // check if we get a success , if so => redirect to write page
            // if success = false, then display error message and ask them to try loggin in again 
    
    }

    render()
    {
        return (
            <div id="login">
                <h3 style={{marginBottom: "4%"}}>Log in</h3>
                <form id="login-form" onSubmit={this.handleSubmit}>
                    <div id="login-container">
                        <label className="login-label">Email</label>
                        <input className="form-control login-input" value={this.state.email} onChange={this.handleEmailChange}></input>
                        <label className="login-label">Password</label>
                        <input className="form-control login-input" type="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    </div>
                    <div className="forgot-password">
                        <a href="/forgot-password" id="forgot">Forgot password?</a>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2" id="login-button">Log in</button>
                </form>
            </div>
        );
    }
}