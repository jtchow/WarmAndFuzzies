import React from 'react';
import "./Signup.css";

export default class Signup extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            first: "",
            last: "",
            email: "",
            password: ""
        }

        this.handleFirstChange = this.handleFirstChange.bind(this);
        this.handleLastChange = this.handleLastChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        // do some validation here

        console.log(this.state);
        //if successful, reroute to write fuzzies page

        this.props.history.push('/write');
    }

    render()
    {
        return (
            <div id="signup">
                <h3 style={{marginBottom: "4%"}}>Sign Up</h3>
                <form id="signup-form" onSubmit={this.handleSubmit}>
                    <div id="signup-container">
                    <label className="signup-label">First Name</label>
                    <input className="form-control signup-input" value={this.state.first} onChange={this.handleFirstChange}></input>
                    <label className="signup-label">Last Name</label>
                    <input className="form-control signup-input" value={this.state.last} onChange={this.handleLastChange}></input>
                    <label className="signup-label">UCI Email</label>
                    <input className="form-control signup-input" value={this.state.email} onChange={this.handleEmailChange}></input>
                    <label className="signup-label">Password</label>
                    <input className="form-control signup-input" type="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2" id="signup-button">Sign Up</button>
                </form>
            </div>
        );
    }
}