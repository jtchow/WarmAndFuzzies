import React, {Component} from 'react';
import Note from './Note.js';
import axios from 'axios';


// view all notes in grid format
// pass User as props to use to get all notes
// we are getting user model from the route call :id
export default class Bag extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: this.props.cookies.get('user'),
            firstName: "", // need to pass this from somewhere?
            lastName: "",
            userID: "",
            notes: [] // get request will fill this array with notes
        }
    }

    componentWillMount(){
        axios.get("http://localhost:5000/notes/view", {params: {email: this.state.sender}})
        .then(response => {
            console.log(response.data);
            if(response.status === 200){
                this.setState({
                    notes: response.data
                });
            }
        })
        .catch((error) =>{
            console.log(error);
        })

        axios.get('http://localhost:5000/user', {          
            params: {email: this.state.email}
        })
            .then(response => {
                console.log(response);
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName
                })
            })

    }

    render(){
        var notes = this.state.notes;
        return(
            <div className = "container" style = {{background: "white"}}>
                <h1>{this.state.firstName}'s Bag</h1>
                {
                    notes.map(note =>
                    {
                        return <Note sender = {note.sender} content = {note.contents} />
                    })
                }

            </div>
        );
    }
}
