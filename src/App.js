import React, { Component } from 'react';
import Navbar from './Navbar';
import Map from './MapEmbed';
import Modal from './Modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entranceLongitude: new Number(),
      entranceLatitude: new Number(),
      isOpen: false,
      username:'',
      password:'',
      entranceType: ''
    };
    
    this.toggleModal = this.toggleModal.bind(this);
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
  
  handleLoginChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  handleLoginSubmit(event) {
    let headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Allow', '*');
    headers.set('Origin', '*');
    
    const login = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL + "/api/login"
      ,
      { 
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      });
      
      const data = await response.json();
      var url = 'https://www.openstreetmap.org/oauth/authorize?oauth_token=' + data.oauthtoken
      window.location.assign(url);
    };
    
    login();

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
      <Modal show={this.state.isOpen} onClose={this.toggleModal} username={this.state.username} password={this.state.password} handleLoginChange={this.handleLoginChange} handleLoginSubmit={this.handleLoginSubmit} /> 
      </div>
      );
    }
  }
  
  export default App;
  