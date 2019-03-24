import React, { Component } from 'react';
import Map from './MapEmbed';
import LoginForm from './LoginForm.js';
import Sidenav from './sidenav/Sidenav.js';
import { Modal } from 'react-materialize';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entranceLongitude: 0,
      entranceLatitude: 0,
      isOpen: false,
      osmUser: false,
      username:'',
      password:'',
      response: false,
      modalOpen: true,
      entranceType: 'yes',
      Number: '',
      Street: '',
      Code: '',
      City: '',
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

  handleAddressChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  };
  
  createNode() {
    let headers = new Headers();
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


      //   <Mod 
      //   show={this.state.isOpen} 
      //   onClose={this.toggleModal} 
      //   onLogin={this.osmLogin} 
      //   osmUser={this.state.osmUser} 
      //   username={this.state.username} 
      //   password={this.state.password} 
      //   handleLoginChange={this.handleLoginChange} 
      //   handleLoginSubmit={this.handleLoginSubmit} /> 
      // </div>

        //     <Navbar 
        // osmUser= {this.state.osmUser} 
        // lon={this.state.entranceLongitude} 
        // lat={this.state.entranceLatitude} 
        // createNode={this.createNode} 
        // handleChange={this.handleEntranceChange} 
        // entranceType={this.state.entranceType} />
  
  render() {
    return (
      <div className="App">
      <Modal
        id='foo'
        open={this.state.modalOpen}
        header='Welcome to OSM Entrance Editor'
        actions={false}
        >
        
        <LoginForm osmLogin={this.handleLoginSubmit} osmUser={this.state.osmUser} />

      </Modal>

      <Sidenav 
        osmUser= {this.state.osmUser} 
        lon={this.state.entranceLongitude} 
        lat={this.state.entranceLatitude} 
        createNode={this.createNode} 
        handleChange={this.handleEntranceChange} 
        entranceType={this.state.entranceType} 
        handleAddress={this.handleAddressChange}
        Number={this.state.Number}
        Street={this.state.Street}
        Code={this.state.Code}
        City={this.state.City}
        />


      <Map 
        updateLongitude = {this.updateLongitude} 
        updateLatitude = {this.updateLatitude} />
      </div>
      );
    }
  }
  
  export default App;
  