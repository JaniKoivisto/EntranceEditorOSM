import React from 'react';
import { Icon } from 'react-materialize';



const Nav = (props) => {


		return(
	  	<div>
				<nav className="blue darken-3">
				  <div className="nav-wrapper">
				    <a className="brand-logo"><Icon medium>menu</Icon></a>
				    <ul id="nav-mobile" className="right hide-on-med-and-down">
				      <li><a><span>Entrance Coordinates: </span>{props.lon.toFixed(4)}, {props.lat.toFixed(4)}</a></li>
				    </ul>
				  </div>
				</nav>
	                
			</div>
			);

}

export default Nav;