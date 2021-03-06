import React, { Component } from 'react';
import $ from 'jquery';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            number: '',
            street: '',
            code: '',
            city: '',
            response: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNodeSubmit = this.handleNodeSubmit.bind(this);
    }



    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        const encodedUsername = new Buffer(this.state.username).toString('base64');
        const encodedPassword = new Buffer(this.state.password).toString('base64');
        $.ajax({
            url: "http://localhost:5000/api/login",
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic ' + encodedUsername + ':' + encodedPassword);

            },
            success: function (data) {
                var response = data;
                console.log(response);
            },
            error: function () {
                console.log("Request failed");
            }
        })

        //Change for successfull response
        this.setState({
            response: true
        });


        event.preventDefault();
    }

    handleNodeSubmit(event) {
        console.log(this.state.number, this.state.street, this.state.code, this.state.city);
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + this.state.encodedUsername + ":" + this.state.encodedPassword);
        headers.set('content-type', 'application/json');
        
        const addNode = async () => {
            const response = await fetch('http://localhost:5000/api/node?lat=' + this.props.entranceLat + '&lon=' + this.props.entranceLon + '&housenumber=' + this.state.number +
            '&street=' + this.state.street + '&postcode=' + this.state.code + '&city=' + this.state.city + '&entrance=yes'
            ,
            { 
                method: 'POST',
                headers: headers
            });
            
            const json = await response.json();
            //TODO: save changesetid
            const nodeId = json.message;
            const changesetId = json.changesetid;
            console.log("nodeId: " + nodeId + " changeSet:" + changesetId);

        }
        
        addNode();
        event.preventDefault();

    }

    render() {
        if (this.state.response) {
            return (
                <div id="correctLogin">
                <p>Add a few tags to the node</p>
                    <form onSubmit={this.handleNodeSubmit}>
                        <label>
                            House number:
                            <input className="form-control" name="number" type="text" value={this.state.number} onChange={this.handleChange} 
                            />
                        </label>
                        <label>
                            Street:
                            <input className="form-control" name="street" type="text" value={this.state.street} onChange={this.handleChange} 
                            />
                        </label>
                        <label>
                            Post code:
                            <input className="form-control" name="code" type="text" value={this.state.code} onChange={this.handleChange} 
                            />
                        </label>
                            <label>
                            City:
                            <input className="form-control" name="city" type="text" value={this.state.city} onChange={this.handleChange} 
                            />
                        </label>
                        <br />
                        <input className="btn btn-primary" type="submit" value="Create entrance node" />                    
                    </form>
                </div>
                )
        } else {
        return (
            <div id="responseFlase">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                  <input className="form-control" name="username" type="text" required value={this.state.username}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                  <input className="form-control" name="password" type="password" required value={this.state.password}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <input className="btn btn-primary" type="submit" value="Login" />
                </form>  
            </div>
        );
        }
    }
}

export default Login;