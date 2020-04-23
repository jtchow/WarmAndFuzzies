import React from 'react';


const Home = function(){
    return(
            <div className = "container">
                <div className="jumbotron">
                    <h1>Welcome!</h1>
                    <p className="lead">Miss your Tomo buddies? Write them a note!</p>
                    <hr className="my-4"></hr>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <a className = "btn btn-primary btn-lg" href = "/login" role = "button">Login</a>
                    
                </div>

            </div>
    );
}

export default Home;