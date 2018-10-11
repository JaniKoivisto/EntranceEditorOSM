import React, { Component } from 'react';
// import './App.css';
import Header from './Header';
import EntranceCoor from './EntranceCoor';
import Form from './Form';
import Map from './MapEmbed';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lon: null,
      lat: null
      };
  }

    //incoming data from child component
    myCallback = (lonFromChild, latFromChild) => {
        this.setState({ 
        lon: lonFromChild,
        lat: latFromChild
      });
        //var lon = dataFromChild[0];
        //var lat = dataFromChild[1];

    };


  render() {
    return (
      <div className="App">
        <Header />
        <EntranceCoor Lon = {this.state.lon} Lat = {this.state.lat}//entranceCoordinates={this.state.clickedCoordinates}
        />
        <Form />
        <Login />
        <Map callbackFromParent={this.myCallback} />
      </div>
    );
  }
}

export default App;
