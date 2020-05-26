import React from 'react';


class Logout extends React.Component
{
    // constructor(props)
    // {
    //     super(props);  
    // }

    componentDidMount(){
        this.props.cookies.remove('user', {path: '/'});
    }

    render()
    {
        return (
            <div className = "container">
            <h1>You have been logged out</h1>

            </div>
        );
    }
}

export default Logout;