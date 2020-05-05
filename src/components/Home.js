import React from 'react';
import Axios from 'axios';
import {useCookies} from 'react-cookie';



const Home = function(){
    const [cookies] = useCookies(['user']);
    return(
            <div className = "container">
                <div className="jumbotron">
                    <h1>Welcome {cookies.user}!</h1>
                    <p className="lead">Miss your Tomo buddies? Write them a note!</p>
                    <hr className="my-4"></hr>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    {cookies.user? <a className = "btn btn-primary btn-lg" href = "/write" role = "button">Write Note</a>
                                    :<a className = "btn btn-primary btn-lg" href = "/login" role = "button">Login</a>}
                    
                </div>

            </div>
    );
}

export default Home;