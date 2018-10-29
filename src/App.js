import React, { Component } from 'react';
// import './App.css';
import Navbar from './Navbar';
import Map from './MapEmbed';
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
      this.osmLogin = this.osmLogin.bind(this);

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

  }




  updateLongitude = (entranceLongitude) => {this.setState({ entranceLongitude })};

  updateLatitude = (entranceLatitude) => {this.setState({ entranceLatitude })};


  render() {
      return (
        <div className="App">        
          <Navbar osmUser= {this.state.osmUser} lon={this.state.entranceLongitude} lat={this.state.entranceLatitude}/>
          <Map updateLongitude = {this.updateLongitude} updateLatitude = {this.updateLatitude} />
          <Modal show={this.state.isOpen} onClose={this.toggleModal} onLogin={this.osmLogin} osmUser={this.state.osmUser} /> 
        </div>
      );
  }
}

export default App;
