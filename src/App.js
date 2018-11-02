import React, { Component } from 'react';
// import './App.css';
import Navbar from './Navbar';
import Map from './MapEmbed';
import Modal from './Modal';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entranceLongitude: new Number(),
      entranceLatitude: new Number(),
      isOpen: false,
      osmUser: false,
      username:'',
      password:'',
      response: false,
      entranceType: ''
      };

      this.toggleModal = this.toggleModal.bind(this);
      this.osmLogin = this.osmLogin.bind(this);
      this.handleLoginChange = this.handleLoginChange.bind(this);
      this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
      this.createNode = this.createNode.bind(this);
      this.handleEntranceChange = this.handleEntranceChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      isOpen: !this.state.isOpen,
    });

  };

  toggleModal(event) {

    this.setState({
      isOpen: !this.state.isOpen,
    });


    event.preventDefault();
  };

  osmLogin(event) {
    this.setState({
      osmUser: !this.state.osmUser,
    });

  };



  handleLoginChange(event) {
      this.setState({ [event.target.name]: event.target.value });
  };

  handleLoginSubmit(event) {
    const encodedUsername = new Buffer(this.state.username).toString('base64');
    const encodedPassword = new Buffer(this.state.password).toString('base64');
    $.ajax({
        url: process.env.REACT_APP_API_URL + "/api/login",
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
          response: true,
    });

   this.setState({
      isOpen: !this.state.isOpen,
    });

    event.preventDefault();

  };


  updateLongitude = (entranceLongitude) => {this.setState({ entranceLongitude })};

  updateLatitude = (entranceLatitude) => {this.setState({ entranceLatitude })};

  handleEntranceChange(event) {
    this.setState({ entranceType: event.target.value });
  };

  createNode() {
    const encodedUsername = new Buffer(this.state.username).toString('base64');
    const encodedPassword = new Buffer(this.state.password).toString('base64');
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + encodedUsername + ":" + encodedPassword);
    headers.set('content-type', 'application/json');
    
    const addNode = async () => {
        const response = await fetch(process.env.REACT_APP_API_URL + '/api/node?lat=' + this.state.entranceLatitude + '&lon=' + this.state.entranceLongitude + '&entrance=' + this.state.entranceType
        ,
        { 
            method: 'POST',
            headers: headers
        });
        
        const json = await response.json();
        //TODO: save changesetid
        const nodeId = json.message;
        const changesetId = json.changesetid;
        console.log("nodeId: " + nodeId + " changeSet:" + changesetId);

    };
    
    addNode();

  };


  render() {
      return (
        <div className="App">        
          <Navbar osmUser= {this.state.osmUser} lon={this.state.entranceLongitude} lat={this.state.entranceLatitude} createNode={this.createNode} handleChange={this.handleEntranceChange} entranceType={this.state.entranceType} />
          <Map updateLongitude = {this.updateLongitude} updateLatitude = {this.updateLatitude} />
          <Modal show={this.state.isOpen} onClose={this.toggleModal} onLogin={this.osmLogin} osmUser={this.state.osmUser} username={this.state.username} password={this.state.password} handleLoginChange={this.handleLoginChange} handleLoginSubmit={this.handleLoginSubmit} /> 
        </div>
      );
  }
}

export default App;
