import React from 'react';
import "./Signup.css";
import axios from 'axios';
import {withRouter} from 'react-router';

class Signup extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "", 
            errorMessage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event)
    {
        event.preventDefault();

        // create User Object with information from form/state
        const newUser = {
            firstName: this.state.first,
            lastName: this.state.last,
            email: this.state.email,
            password: this.state.password
        }

        // store in database (will prob have to change localhost to something else)
        axios.post('http://localhost:5000/signup', newUser).then(response => {
            this.props.cookies.set('user', this.state.email, {path: '/'});
            this.props.history.push('/write');
          }).catch((error) => {
                alert(error.response.data.error)
          });
          
    }

    render()
    {
        return (
            <div id="signup" className = "container">
                <h3 style={{marginBottom: "4%"}}>Sign Up</h3>
                <form id="signup-form" onSubmit={this.handleSubmit}>
                    <div id="signup-container">
                    <label className="signup-label">First Name</label>
                    <input className="form-control signup-input" required value={this.state.first} onChange={(event) => {this.setState({first: event.target.value})}}></input>
                    <label className="signup-label">Last Name</label>
                    <input className="form-control signup-input" required value={this.state.last} onChange={(event) => this.setState({last: event.target.value})}></input>
                    <label className="signup-label">UCI Email</label>
                    <input className="form-control signup-input" required value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}></input>
                    <label className="signup-label">Password</label>
                    <input className="form-control signup-input" required type="password" value={this.state.password} onChange={(event) => this.setState({password: event.target.value})}></input>
                    <p className = "errorMessage">{this.state.errorMessage}</p>

                    </div>
                    <button type="submit" className="btn btn-primary mb-2" id="signup-button">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Signup);