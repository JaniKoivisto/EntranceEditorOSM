import React, { Component } from 'react';
import $ from 'jquery';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                  <input name="username" type="text" required value={this.state.username}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                  <input name="password" type="password" required value={this.state.password}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default Login;