import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"

import MyNav from './components/MyNavbar';
import WriteFuzzies from './components/WriteFuzzies';
import UserView from './components/User';
import EditUserView from './components/EditUser';

function App() {
  return (
    <Router>
      <div>
        <MyNav />
        <br/>
        <Route path="/" exact component={WriteFuzzies}/>
        {/* Change the write fuzzies component when writing period is done to viewing component */}
        <Route path="/user-profile" exact component={UserView} />
        <Route path="/user-profile/edit" exact component={EditUserView} />
      </div>
  </Router>
  );
}

export default App;
