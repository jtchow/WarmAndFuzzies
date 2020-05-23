import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "./WriteFuzzies.css";
import axios from 'axios';

/*
todo: need to figure out how to pass props using router
add search box in dropdown
*/

export default class WriteFuzzies extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            sender: this.props.cookies.get('user'), // get this from redis session instead?? 
            recipients: [], // people we can write to, as tuples (userid, firstname, lastname)
            recipient: '',
            writtenTo: [],
            message: '',
            filter: 'all',
            filterText: 'Filter'
        };

        this.handleRecipientChange = this.handleRecipientChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:5000/notes/users-all')
            .then(response => {
                this.setState({
                    recipients: response.data
                })
            })
            .catch(function (error){
                console.log(error);
            })

        // call another method to get a list of all users we've written to already
        
        axios.get("http://localhost:5000/notes/users-written-to", {params: {email: this.state.sender}})
            .then(response => {
                console.log(response);
                this.setState({
                    writtenTo: response.data
                });
                console.log(response.data);
            })

    }


    handleRecipientChange(event)
    {
        this.setState({
            recipient: event.target.value
        });
    }

    handleMessageChange(event)
    {
        this.setState({
            message: event.target.value
        });      
    }

    handleFilterChange(event)
    {
        this.setState({
            filter: event.target.value,
            filterText: "All"
        });
        this.typeahead.getInstance().clear();
    }

    handleSubmit(event)
    {
        event.preventDefault();

        if(this.state.recipient === "")
        {
            alert("Please select a recipient");
        }
        else if(this.state.message === "")
        {
            alert("Message cannot be blank");
        }
        else
        {
            const note = {
                sender: this.state.sender, // this will be the current user's session id
                recipient: this.state.recipient,
                message: this.state.message
            }

            axios.post("http://localhost:5000/send", note)
                .then(res => console.log(res.data));
                // need to implement check if the post request was successful

            //check if successful--if successful clear form else dont and let them try again
            this.setState({
                recipient: '',
                message: ''
            });
            this.typeahead.getInstance().clear();

            alert("Warm and fuzzy sent!");
        }
    }

    render()
    {
        // user list filter functions

        const noFilter = (recipient) => (true);
        const filterWritten = (recipient) => (this.state.writtenTo.includes(recipient.email));
        const filterNotWritten = (recipient) => (!this.state.writtenTo.includes(recipient.email));

        // filter options here
        const filterFunc = this.state.filter === "all" ? noFilter : this.state.filter === "written" ? filterWritten : filterNotWritten;
        const recipientNames = this.state.recipients.filter(filterFunc).map((recipient) => (recipient.firstName + " " + recipient.lastName)); // this will break rn bc no .name value


        return (
            <div className="write-form" id="write-fuzzies">
                <form onSubmit={this.handleSubmit}>
                    <div className="dropdown">
                        <h3 id="write-label">Select a recipient and write a warm and fuzzy!</h3>
                        <br/>

                        <div className="fuzzies-forms" id="select-div">
                            <Typeahead 
                                style={{width:"68%", float: "left"}}
                                id="recipient-select"
                                options={recipientNames}
                                onChange={(selected) => {
                                    let recipientID = recipients.filter((recipient) => (recipient.name === selected[0]))[0];
                                    recipientID = recipientID === undefined ? "" : recipientID.id;
                                    this.setState({recipient: recipientID});
                                }}
                                placeholder="Choose a recipient"
                                ref={(typeahead) => this.typeahead = typeahead}
                            />

                            <select id="filter-select" className="form-control" onChange={this.handleFilterChange}>
                                <option value="all">{this.state.filterText}</option>
                                <option value="not-written">Not written to</option>
                                <option value="written">Written to</option>
                            </select>
                        </div>
                    </div>

                    <div className="fuzzies-forms">
                        <br/>
                        <textarea className="form-control" value={this.state.message} onChange={this.handleMessageChange} style={{height: "25vh"}}></textarea>
                        
                        <br/>
                        <button type='submit' id="write-button" className="btn btn-primary mb-2">Put in bag!</button>
                    </div>
                </form>
            </div>
        );
    }
}