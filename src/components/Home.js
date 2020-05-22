import React from 'react';
import {useCookies} from 'react-cookie';


// TODO add get request for user email to display first name in welcome message
const Home = function(){
    const [cookies] = useCookies(['user']);
    return(
            <div className = "container">
                <div className="jumbotron">
                    <h1>Welcome {cookies.user}!</h1>
                    <p className="lead">Miss your Tomo buddies? Write them a note!</p>
                    <hr className="my-4"></hr>
                    {cookies.user? <a className = "btn btn-primary btn-lg" href = "/write" role = "button">Write Note</a>
                                    :<a className = "btn btn-primary btn-lg" href = "/login" role = "button">Login</a>}
                    
                </div>

            </div>
    );
}

export default Home;