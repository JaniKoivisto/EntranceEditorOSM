import React from 'react';

class EntranceCoor extends React.Component {
	constructor(props) {
		super(props);
	}


	render () {
		
		return (
			<div>
				<p>Entrance Coordinates: </p>
				<p id="nodeCoordinates">{this.props.Lon} longitute & {this.props.Lat} latitude</p>
			</div>
		);
	}

}

export default EntranceCoor;