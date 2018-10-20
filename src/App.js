import React, { Component } from 'react';
// import './App.css';
import Navbar from './Navbar';
import EntranceCoor from './EntranceCoor';
import Form from './Form';
import Map from './MapEmbed';
import Login from './Login';
import Modal from './Modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entranceLongitude: null,
      entranceLatitude: null,
      osmUser: false,
      };

  }



  updateLongitude = (entranceLongitude) => {this.setState({ entranceLongitude })};

  updateLatitude = (entranceLatitude) => {this.setState({ entranceLatitude })};


  render() {
      return (
        <div className="App">        
          <Navbar />
          <Modal />
          <EntranceCoor entranceLon = {this.state.entranceLongitude} entranceLat = {this.state.entranceLatitude}/>
          <Map updateLongitude = {this.updateLongitude} updateLatitude = {this.updateLatitude} />    
        </div>
      );
  }
}

export default App;
