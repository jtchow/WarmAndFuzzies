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
            sender: props.userid, // get this from redis session instead?? 
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
        // axios.get('http://localhost:5000/notes/users')
        //     .then(response => {
        //         this.setState({
        //             recipients: response.data.recipients;
        //         })
        //     })
        //     .catch(function (error){
        //         console.log(error);
        //     })

        // // call another method to get a list of all users we've written to already
        
        // axios.get("http://localhost:5000/notes/written/" + [USER ID])
        //     .then(response => {
        //         this.setState({
        //             writtenTo: response.data.writtenTo
        //         });
        //     })

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
                sender: this.state.sender, // this will be the current user's id
                recipient: this.state.recipient,
                message: this.state.message
            }

            axios.post("https://localhost:5000/send", note)
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
        //in future get this list from api call
        // const recipients = [
        //     {name: "Angela", id: 1},
        //     {name: "Annie", id: 2},
        //     {name: "Brandon", id: 3},
        //     {name: "Brian", id: 4},
        //     {name: "Darren", id: 5},
        //     {name: "Jason", id: 6},
        //     {name: "Kasey", id: 7},
        //     {name: "Kylie", id: 8},
        //     {name: "Kyle", id: 9},
        //     {name: "Richard", id: 10},
        //     {name: "Sarah", id: 11},
        //     {name: "Tyler Onishi", id: 12},
        //     {name: "Tyler Yin", id: 13},
        // ];

        //const writtenTo = [1,3,4,5]; //list of ids of users who the user has written to--also get this from api

        // IMPORTANT:
        // will have to convert the user ids to names when we display them in the filter
        // BUT we still want to save the recipient as an ID to make access easier

        // user list filter functions
        const noFilter = (recipient) => (true);
        const filterWritten = (recipient) => (this.state.writtenTo.includes(recipient.id));
        const filterNotWritten = (recipient) => (!this.state.writtenTo.includes(recipient.id));

        // filter options here
        const filterFunc = this.state.filter === "all" ? noFilter : this.state.filter === "written" ? filterWritten : filterNotWritten;
        const recipientNames = this.state.recipients.filter(filterFunc).map((recipient) => recipient.name); // this will break rn bc no .name value
        //name list needs to be passed from props or use api call somewhere


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