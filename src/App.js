import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import MyNav from './components/MyNavbar';
import WriteFuzzies from './components/WriteFuzzies';
import UserView from './components/User';
import EditUserView from './components/EditUser';
import Home from './components/Home';
import Bag from './components/Bag.js';
import Signup from './components/Signup.js';

function App() {
  return (
    <Router>
      <div>
        <MyNav />
        <br/>
        <Route path="/" exact component={Home}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/bag/:id" exact component = {Bag}></Route>
        <Route path= "/write" exact component = {WriteFuzzies}/>
        {/* Change the write fuzzies component when writing period is done to viewing component */}
        <Route path="/user-profile" exact component={UserView} />
        <Route path="/user-profile/edit" exact component={EditUserView} />
      </div>
  </Router>
  );
}

export default App;
