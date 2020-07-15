import React from 'react';
import "./Login.css";
import axios from 'axios';
import {withRouter} from 'react-router';

class Login extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event)
    {
        event.preventDefault();

        console.log(this.state);

        const login = {
            email: this.state.email,
            password: this.state.password,
        }

        // check information with database
        axios.post('http://localhost:5000/login', login)
            .then((response) => {
                this.props.cookies.set('user', this.state.email, {path: '/'});
                this.props.history.push('/write');

            }, (error) => {
                console.log(error);
                alert(error.response.data.error);
                // CREATE SOME ERROR POP UP HERE OR SOMETHING!

            });           
    }

    render()
    {
        return (
            <div id="login">
                <h3 style={{marginBottom: "4%"}}>Log in</h3>
                <form id="login-form" onSubmit={this.handleSubmit}>
                    <div id="login-container">
                        <label className="login-label">Email</label>
                        <input className="form-control login-input" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}></input>
                        <label className="login-label">Password</label>
                        <input className="form-control login-input" type="password" value={this.state.password} onChange={(event) => this.setState({password: event.target.value}) }></input>
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
export default withRouter(Login);