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
      isOpen: false,
      osmUser: false,
      };

      this.toggleModal = this.toggleModal.bind(this);

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




  updateLongitude = (entranceLongitude) => {this.setState({ entranceLongitude })};

  updateLatitude = (entranceLatitude) => {this.setState({ entranceLatitude })};


  render() {
      return (
        <div className="App">        
          <Navbar osmUser= {this.state.osmUser} lon={this.state.entranceLongitude} lat={this.state.entranceLatitude}/>
          <EntranceCoor entranceLon = {this.state.entranceLongitude} entranceLat = {this.state.entranceLatitude}/>
          <Map updateLongitude = {this.updateLongitude} updateLatitude = {this.updateLatitude} />
          <Modal show={this.state.isOpen} onClose={this.toggleModal}>
          </Modal>  
        </div>
      );
  }
}

export default App;
