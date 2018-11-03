import React, { Component } from 'react';


class Navbar extends Component {
		constructor(props) {
		super(props)
		this.state = {
			//entranceType: '',
		};

		//this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	 // handleChange(event) {
  //   this.setState({ entranceType: event.target.value });
  // }


   handleSubmit(event) {

		if(this.props.osmUser === false) {
			//alert('no osm login ' + this.props.entranceType);
			//Note API
			fetch(process.env.REACT_APP_API_URL + '/api/notes?lat=' + this.props.lat + '&lon=' + this.props.lon + '&text=Building entrance: ' + this.props.entranceType, 
			{ 
				method: 'POST',
				})
			.then(res => console.log(res))
			.catch(err => console.log('Error', err));

			event.preventDefault();

		} else {
			this.props.createNode();
			//alert('osm user ' + this.props.entranceType);

    event.preventDefault();

    }   
  
  }

  


	render() {

		return(

					<nav className="navbar navbar-light bg-light justify-content-between">

					  <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
							<div className="input-group mr-sm-2">
							  <select className="custom-select" id="inputGroupSelect04" value={this.props.entranceType}
	          onChange={this.props.handleChange}>
	          			<option defaultValue>Choose entrance type...</option>
							    <option value="main">main</option>
							    <option value="service">service</option>
							    <option value="exit">exit</option>
							    <option value="emergency">emergency</option>
							    <option value="staircase">staircase</option>
							    <option value="home">home</option>
							  </select>
							  <div className="input-group-append">
							  	<input className="btn btn-outline-secondary" style=
							  	{{zIndex: 0}}type="submit" value="Submit!" />
							  </div>
							</div>
					  </form>

					  <span className="navbar-text">Entrance Coordinates: {this.props.lon.toFixed(4)}, {this.props.lat.toFixed(4)}</span>

					</nav>

			);
	}
}

export default Navbar;