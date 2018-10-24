import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

class Modal extends React.Component {

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    } else {

	    // The gray background
	    const backdropStyle = {
	      position: 'fixed',
	      top: 0,
	      bottom: 0,
	      left: 0,
	      right: 0,
	      backgroundColor: 'rgba(0,0,0,0.7)',
	      padding: 50
	    };

	    // The modal "window"
	    const modalStyle = {
	    	//position: 'relative',
	      backgroundColor: 'rgb(255,255,255)',
	      borderRadius: 5,
	      maxWidth: 500,
	      minHeight: 300,
	      margin: '0 auto',
	      padding: 30,
	      zIndex: 1
	    };

	    return (
	    	<div>
		      <div className="backdrop" style={backdropStyle}>
		        <div style={modalStyle}>
		          <p>Do you want to use your OpenStreetMap credits?</p>
		          <br/>
		          <br/>
		          <div className="footer">
		            <button className ="btn btn-primary" style={{margin: 10}} onClick={this.props.onClose}>Yes, log me in!</button>
		            <button className ="btn btn-primary" style={{margin: 10}} onClick={this.props.onClose}>No, I don't have OSM account</button>
		          </div>
		        </div>
		      </div>
	      </div>
	    );

	  }

  }
}





// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   show: PropTypes.bool,
//   children: PropTypes.node
// };


export default Modal;