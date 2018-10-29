import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            response: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleNodeSubmit = this.handleNodeSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
    	console.log('logged in')

      const encodedUsername = new Buffer(this.state.username).toString('base64');
      const encodedPassword = new Buffer(this.state.password).toString('base64');
      $.ajax({
          url: "http://localhost:5000/api/login",
          type: 'GET',
          beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Basic ' + encodedUsername + ':' + encodedPassword);

          },
          success: function (data) {
              var response = data;
              console.log(response);
          },
          error: function () {
              console.log("Request failed");
          }
      })

    	//Change for successfull response
    	this.setState({
            response: true
      });


      event.preventDefault();
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
	      padding: 30,
	      zIndex: 1
	    };

	    if(this.props.osmUser === false) {

	    return (
	    	<div>
		      <div className="backdrop" style={backdropStyle}>
		        <div style={modalStyle}>
		        	<span>Welcome to OSM Entrance Editor</span>
		        	<br/>
		          <p>Do you want to use your OpenStreetMap credits?</p>
		          <br/>
		          <div className="footer">
		            <button className ="btn btn-outline-secondary" style={{margin: 10}} onClick={this.props.onLogin}>Yes, log me in!</button>
		            <button className ="btn btn-outline-secondary" style={{margin: 10}} onClick={this.props.onClose}>No, I don't have OSM account</button>
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
                  <input className="form-control" name="username" type="text" required value={this.state.username}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                  <input className="form-control" name="password" type="password" required value={this.state.password}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <input className="btn btn-outline-secondary" type="submit" value="Login" onClick={this.props.onClose} />
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