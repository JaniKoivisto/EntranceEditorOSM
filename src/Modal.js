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

	    const flexStyle ={
			  display: 'flex',
			  justifyContent: 'space-evenly',
			  alignItems: 'center'
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
                    <div style={flexStyle}>
	                    <input className="btn btn-outline-secondary" type="submit" value="Login" onClick={this.props.handleLoginSubmit} />
	                    <a href="#" className="card-link" onClick={this.props.onLogin}>Go Back</a>
                    </div>
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


export default Modal;