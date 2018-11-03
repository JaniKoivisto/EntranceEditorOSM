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

    	//POST call
    	fetch('https://api.openstreetmap.org/api/0.6/notes?lat=' + this.props.entranceLat + '&lon=' + this.props.entranceLon + '&text=' + this.state.userText, 
			{ 
				method: 'POST',
				})
			.then(res => alert("Your note has been sent") )
			.catch(err => console.log('Error', err));

		this.setState({ userText: '' });

    event.preventDefault();   
  
  }


	render() {
		return(	
				<div className="form">
				<form onSubmit={this.handleSubmit}>
	        <label>
	          Comment:
	          <textarea className="form-control" name="userText" type="text" value={this.state.userText}
	          onChange={this.handleChange} placeholder="e.g. Building's address"/>
	        </label>
	        <br />
	        <input className="btn btn-primary" type="submit" value="Submit note" />
      </form>
      </div>
			);
	}
}

export default Form;