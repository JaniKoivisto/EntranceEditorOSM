import React, { Component } from 'react';

class Form extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: '',
			userText: '',
		};

		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert(this.state.userName + ' says: ' + this.state.userText);

    	//POST call

    	fetch('https://api.openstreetmap.org/api/0.6/notes?lat=71.08052142975149&lon=-8.179561614990236&text=test', 
			{ 
				method: 'POST',
				})
			.then(res => console.log(res))
			.catch(err => console.log('Error', err));

    event.preventDefault();
  }


	render() {
		return(	
				<div>
				<form onSubmit={this.handleSubmit}>
	        <label>
	          Name:
	          <input name="userName" type="text" value={this.state.userName}
	          onChange={this.handleChange}/>
	        </label>
	        <br />
	        <label>
	          Other text:
	          <textarea name="userText" type="text" value={this.state.userText}
	          onChange={this.handleChange}/>
	        </label>
	        <br />
	        <input type="submit" value="Submit" />
      </form>
      </div>
			);
	}
}

export default Form;