import React from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

    }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
    	return null
    } else {

	    // The gray background
	    const backdropStyle = {
	      position: 'fixed',
	      top: 0,
	      bottom: 0,
	      left: 0,
	      right: 0,
	      backgroundColor: 'rgba(0,0,0,0.7)',
	      padding: 50,
	    };

	    // The modal "window"
	    const modalStyle = {
	      backgroundColor: 'rgb(248,249,250)',
	      borderRadius: 5,
	      maxWidth: 550,
	      minHeight: 250,
	      margin: '0 auto',
	      padding: 40,
	      zIndex: 1
	    };

	    return (
	    	<div>
		      <div className="backdrop" style={backdropStyle}>
		        <div style={modalStyle}>
		        	<h5>Welcome to OSM Entrance Editor</h5>
		          <p>Do you want to use your OpenStreetMap credits?</p>
		          <br/>
		          <div className="footer">
		            <button className ="btn btn-outline-secondary btn-block" onClick={this.props.handleLoginSubmit}>Yes, log me in!</button>
		            <button className ="btn btn-outline-secondary btn-block" onClick={this.props.onClose}>No, thank you</button>
		          </div>
		        </div>
		      </div>
	      </div>
	    );
	  }
  }
}

export default Modal;