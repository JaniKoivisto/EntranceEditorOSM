import React, { Component } from 'react';
import $ from 'jquery';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            response: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    render() {
        if (this.state.response) {
            return (
                <div id="correctLogin">
                <p>Add a few tags to the node</p>
                    <form>
                        <label>
                            House number:
                            <input className="form-control" name="number" type="text" //value={this.state.username} onChange={this.handleChange} 
                            />
                        </label>
                        <label>
                            Street:
                            <input className="form-control" name="street" type="text" //value={this.state.username} onChange={this.handleChange} 
                            />
                        </label>
                        <label>
                            Post code:
                            <input className="form-control" name="code" type="text" //value={this.state.username} onChange={this.handleChange} 
                            />
                        </label>
                            <label>
                            City:
                            <input className="form-control" name="city" type="text" //value={this.state.username} onChange={this.handleChange} 
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