import React, { Component } from 'react';

class Modal extends Component {

  render() {
  return (
    <div className="container">
		  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Open Modal</button>
		  <div className="modal fade" id="myModal" role="dialog">
		    <div className="modal-dialog">
		      <div className="modal-content">
		        	<div className="modal-header">
		          	<button type="button" className="close" data-dismiss="modal">&times;</button>
		        	</div>
		        <div className="modal-body">
		          <p>Do you want to log in with OpenStreetMap credits?</p>
		        </div>
		        <div className="modal-footer">
		          <button type="button" className="btn btn-primary" data-dismiss="modal">Yes</button>
		          <button type="button" className="btn btn-primary" data-dismiss="modal">No</button>
		        </div>
		      </div>
		      
		    </div>
		  </div> 
		</div>

  );
}

};

export default Modal;