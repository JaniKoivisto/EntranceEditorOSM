import React from 'react';
import { Button, Row, Col} from 'react-materialize';
import './LoginForm.css';


const LoginForm = (props) => {

	if(props.osmUser) {
		return(
			<h6>OSM login opens...</h6>
		);
	} else {
		return(
			<div>
			<h5>Instructions:</h5>
			<ul style={{ listStyleType: "none" }}>
			  <li>Pan the map to the entrance location</li>
			  <li>Choose entrance type</li>
			  <li>Fill in address data</li>
			  <li>Submit!</li>
			</ul>
			<h6>Do you want to log in through OpenStreetMap?</h6>
			
			  <Row>
          <Col><Button className='modal-close blue darken-3' >No, thanks!</Button></Col>
          <Col><Button className='blue darken-3' onClick={props.osmLogin} >Yes, log me in</Button></Col>
        </Row>
			</div>
		);
	}


}

export default LoginForm;