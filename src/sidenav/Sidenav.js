import React, { Component } from 'react';
import { Button, Icon, SideNav, Collapsible, CollapsibleItem, SideNavItem } from 'react-materialize';
import Pasek from '../Navbar_new.js';
import Checkbox from '../Checkbox.js';
import Address from '../Address.js';
import './Sidenav.css';

const entranceTypes = [
  'main',
  'service',
  'exit',
  'emergency',
  'staircase',
  'home'
];

const address =[
	'Number',
	'Street',
	'Code',
	'City'
]

class Sidenav extends Component {
		constructor(props) {
		super(props)
		this.state = {
			// active: false,
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
			

    event.preventDefault();

    }   
  
  };

  	  

  createCheckbox = label => (
    <Checkbox
            label={label}
            entranceType={this.props.entranceType}
            onChange={this.props.handleChange}
            key={label}
        />
  );

  createCheckboxes = () => (
    entranceTypes.map(this.createCheckbox)
  );

  createAddress = label => (
  	<Address
	    label={label}
	    onChange={this.props.handleAddress}
	    key={label}
	    userInput={this.props.label}
	  />
  );


	createAddressInput = () => (
	  address.map(this.createAddress)
	);

	render() {
		const {lon, lat } = this.props;

		return(
				<div>
					<SideNav
					  trigger={
					  	<div>
					  	<Pasek lon={lon} lat={lat} />
							</div>
						}
					  options={{ closeOnClick: true }}
					  >

					  <div>
					  
					  <form onSubmit={this.handleSubmit}>
					  
					  <Collapsible accordion defaultActiveKey={0}>
					  	<CollapsibleItem className="hide-on-large-only" header='Entrance Coordinates' icon='gps_fixed'>
					  		{this.props.lon.toFixed(4)}, {this.props.lat.toFixed(4)}
					  	</CollapsibleItem>
						  <CollapsibleItem header='Choose entrance type' icon='info_outline'>

								{this.createCheckboxes()}

						  </CollapsibleItem>
						  <CollapsibleItem header='Add entrance address' icon='place'>

								{this.createAddressInput()}

						  </CollapsibleItem>
						</Collapsible>
						
						<SideNavItem divider />
						<SideNavItem>
						<Button waves='light' className="button blue darken-3" type="submit">Submit<Icon right>send</Icon></Button>
						</SideNavItem>
						</form>
						
						</div>
						
					</SideNav>
                
				</div>

			);
	}
}

export default Sidenav;