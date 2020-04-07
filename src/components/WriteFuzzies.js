import React from 'react';

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
            sender: props.userid,
            recipient: '',
            message: '',
            filter: 'all'
        };

        this.handleRecipientChange = this.handleRecipientChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            filter: event.target.value
        });
    }

    handleSubmit(event)
    {
        event.preventDefault();

        const object = {
            sender: this.state.sender,
            recipient: this.state.recipient,
            message: this.state.message
        }

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
            console.log(object); //send to backend
            //check if successful--if successful clear form else dont and let them try again
            this.setState({
                recipient: 'Select a recipient',
                message: ''
            });

            alert("Warm and fuzzy sent!");
        }
    }

    render()
    {
        //in future get this list from api call
        const recipients = [
            {name: "Angela", id: 1},
            {name: "Annie", id: 2},
            {name: "Brandon", id: 3},
            {name: "Brian", id: 4},
            {name: "Darren", id: 5},
            {name: "Jason", id: 6},
            {name: "Kasey", id: 7},
            {name: "Kylie", id: 8},
            {name: "Kyle", id: 9},
            {name: "Richard", id: 10},
            {name: "Sarah", id: 11},
            {name: "Tyler Onishi", id: 12},
            {name: "Tyler Yin", id: 13}
        ];

        const writtenTo = [1,3,4,5]; //list of ids of users who the user has written to--also get this from api

        // user list filter functions
        const noFilter = (recipient) => (true);
        const filterWritten = (recipient) => (writtenTo.includes(recipient.id));
        const filterNotWritten = (recipient) => (!writtenTo.includes(recipient.id));

        // filter options here
        const filterFunc = this.state.filter === "any" ? noFilter : this.state.filter === "written" ? filterWritten : filterNotWritten;
        const options = recipients.filter(filterFunc).map((recipient) => (<option key={recipient.id} value={recipient.id}>{recipient.name}</option>));
        //name list needs to be passed from props or use api call somewhere


        return (
            <div className="write-form" id="write-fuzzies">
                <form onSubmit={this.handleSubmit}>
                    <div className="dropdown">
                        <h3 id="write-label">Select a recipient and write a warm and fuzzy!</h3>
                        <br/>

                        <div id="filter-label">
                            <p>Filter</p>
                        </div>

                        <div className="fuzzies-forms">
                            <select id="filter-select" className="form-control" onChange={this.handleFilterChange}>
                                <option value="all">All</option>
                                <option value="not-written">Not written to</option>
                                <option value="written">Written to</option>
                            </select>

                            <select className="form-control" value={this.state.recipient} onChange={this.handleRecipientChange}>
                                <option value="">Select a recipient</option>
                                {options}
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