import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';


/*
todo: need to figure out how to pass props using router
style name list based on who youve sent or not sent fuzzies to
*/

export default class WriteFuzzies extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            sender: props.userid,
            recipient: '',
            message: ''
        };

        this.handleRecipientChange = this.handleRecipientChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
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
        const recipientNames = ["Annie", "Jason", "Kasey", "Tyler"];
        //name list needs to be passed from props or use api call somewhere
        
        let styling = {
            width: "42%",
            display: "inline-block",
            marginLeft: "29%",
            marginRight: "29%",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "5%",
            textAlign: "center",
            backgroundColor: "#f0f6fc"
        };

        return (
            <div className="write-form" style={styling}>
                <form onSubmit={this.handleSubmit}>
                    <div className="dropdown">
                        <h3 style={{color: "rgb(78, 81, 84)"}}>Select a recipient and write a warm and fuzzy!</h3>
                        <br/>
                        <div style={{width: "96%", marginLeft: "2%", marginRight: "2%"}}>
                            <Typeahead
                            id="recipient list"
                            onChange={(selected) => {
                                this.setState({recipient: selected[0]});
                            }}
                            options={recipientNames}
                            selected={[this.state.recipient]}
                            placeholder="Select a recipient"
                            />
                        </div>
                    </div>

                    <div style={{width: "96%", marginLeft: "2%", marginRight: "2%"}}>
                        <br/>
                        <textarea className="form-control" value={this.state.message} onChange={this.handleMessageChange} style={{height: "25vh"}}></textarea>
                        
                        <br/>
                        <button type='submit' className="btn btn-primary mb-2" style={{backgroundColor: "rgb(60, 116, 180)", borderColor: "rgb(60, 116, 180)"}}>Put in bag!</button>
                    </div>
                </form>
            </div>
        );
    }
}