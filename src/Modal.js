import React from 'react';
import PropTypes from 'prop-types';
//import $ from 'jquery';

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
	    	//position: 'relative',
	      backgroundColor: 'rgb(248,249,250)',
	      borderRadius: 5,
	      maxWidth: 550,
	      minHeight: 250,
	      margin: '0 auto',
	      padding: 40,
	      zIndex: 1
	    };

	    if(this.props.osmUser === false) {

	    return (
	    	<div>
		      <div className="backdrop" style={backdropStyle}>
		        <div style={modalStyle}>
		        	<h5>Welcome to OSM Entrance Editor</h5>
		          <p>Do you want to use your OpenStreetMap credits?</p>
		          <br/>
		          <div className="footer">
		            <button className ="btn btn-outline-secondary btn-block" onClick={this.props.onLogin}>Yes, log me in!</button>
		            <button className ="btn btn-outline-secondary btn-block" onClick={this.props.onClose}>No, thank you</button>
		          </div>
		        </div>
		      </div>
	      </div>
	    );
	  	} else {
		    return (
		    	<div>
			      <div className="backdrop" style={backdropStyle}>
			        <div style={modalStyle}>
			          <div id="responseFlase">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                  <input className="form-control" name="username" type="text" required value={this.props.username}
                            onChange={this.props.handleLoginChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                  <input className="form-control" name="password" type="password" required value={this.props.password}
                            onChange={this.props.handleLoginChange} />
                    </label>
                    <br />
                    <input className="btn btn-outline-secondary" type="submit" value="Login" onClick={this.props.handleLoginSubmit} />
                </form>  
            </div>
			        </div>
			      </div>
		      </div>
		    );	  		

	  	}
	  }



  }
}





// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   show: PropTypes.bool,
//   children: PropTypes.node
// };


export default Modal;