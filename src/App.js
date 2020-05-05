import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {withCookies} from 'react-cookie';
import Component from 'react';

import "./App.css"

import MyNav from './components/MyNavbar';
import WriteFuzzies from './components/WriteFuzzies';
import UserView from './components/User';
import EditUserView from './components/EditUser';
import Home from './components/Home';
import Bag from './components/Bag.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';

class App extends React.Component{
  render(){
    return (
      <Router>
        <div>
          <MyNav />
          {/* <Route path="/" render = {() => (<MyNav cookies = {this.props.cookies}/>)}/> */}
          <br/>
          <Route path="/" exact render = {() => (<Home cookies = {this.props.cookies}/>)}/>
          <Route path="/signup" exact render = {() => (<Signup cookies = {this.props.cookies}/>)}/>
          <Route path="/login" exact render = {() => (<Login cookies = {this.props.cookies}/>)}/>
          <Route path="/bag/:id" exact component = {Bag}></Route>
          <Route path= "/write" exact component = {WriteFuzzies}/>
          {/* Change the write fuzzies component when writing period is done to viewing component */}
          <Route path="/user-profile" exact component={UserView} />
          <Route path="/user-profile/edit" exact component={EditUserView} />
        </div>
    </Router>
  );
  }
}

export default withCookies(App);
