import React, { Component } from 'react';

class Navbar extends Component {
		constructor(props) {
		super(props)
		this.state = {
			entranceType: '',
		};

		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	 handleChange(event) {
    this.setState({ entranceType: event.target.value });
  }


   handleSubmit(event) {

  //   	//POST call
  //   	fetch('https://api.openstreetmap.org/api/0.6/notes?lat=' + this.props.entranceLat + '&lon=' + this.props.entranceLon + '&text=' + this.state.userText, 
		// 	{ 
		// 		method: 'POST',
		// 		})
		// 	.then(res => alert("Your note has been sent") )
		// 	.catch(err => console.log('Error', err));

		// this.setState({ userText: '' });
		alert(this.state.entranceType)

    event.preventDefault();   
  
  }


	render() {
		return(
				<div>
					<nav className="navbar navbar-light bg-light">
					  <form className="form-inline" onSubmit={this.handleSubmit}>
							<div className="input-group">
							  <select className="custom-select" id="inputGroupSelect04" value={this.state.entranceType}
	          onChange={this.handleChange}>
							    <option value="main">main</option>
							    <option value="service">service</option>
							    <option value="exit">exit</option>
							    <option value="emergency">emergency</option>
							    <option value="staircase">staircase</option>
							    <option value="home">home</option>
							  </select>
							  <div className="input-group-append">
							  	<input className="btn btn-outline-secondary" type="submit" value="Submit!" />
							  </div>
							</div>
					  </form>
					</nav>
				</div>
			);
	}
}

export default Navbar;