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

		if(this.props.osmUser) {
			console.log('no osm login');

		} else {
			alert(this.state.entranceType)

			fetch('http://localhost:5000/api/notes?lat=' + this.props.lat + '&lon=' + this.props.lon + '&text=Building entrance: ' + this.state.entranceType, 
			{ 
				method: 'POST',
				})
			.then(res => console.log(res))
			.catch(err => console.log('Error', err));

		}

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
	          			<option value="choose">Choose entrance type...</option>
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