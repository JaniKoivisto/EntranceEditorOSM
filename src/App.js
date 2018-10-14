import React, { Component } from 'react';
// import './App.css';
import Header from './Header';
import EntranceCoor from './EntranceCoor';
import Form from './Form';
import Map from './MapEmbedVector';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entranceLongitude: null,
      entranceLatitude: null
      };

    this.updateLongitude = this.updateLongitude;
    this.updateLatitude = this.updateLatitude;
  }

 

  updateLongitude = (entranceLongitude) => {this.setState({ entranceLongitude })};

  updateLatitude = (entranceLatitude) => {this.setState({ entranceLatitude })};


  render() {
    return (
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">

              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item"><a className="nav-link active" id="home-tab" data-toggle="tab" href="#user" role="tab" aria-controls="home" aria-selected="true">Anonymous user</a></li>
                <li className="nav-item"><a className="nav-link" id="profile-tab" data-toggle="tab" href="#OSM" role="tab" aria-controls="profile" aria-selected="false">OSM user</a></li>
              </ul>

              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="user" role="tabpanel" aria-labelledby="home-tab">

                  <EntranceCoor entranceLon = {this.state.entranceLongitude} entranceLat = {this.state.entranceLatitude}/>
                  <Form entranceLon = {this.state.entranceLongitude} entranceLat = {this.state.entranceLatitude}/>

                </div>
                <div className="tab-pane fade" id="OSM" role="tabpanel" aria-labelledby="profile-tab">
                  
                  <Login />
                </div>
              </div>

            </div>

            <div className="col-sm-9">

              <Map updateLongitude = {this.updateLongitude} updateLatitude = {this.updateLatitude} />
              
            </div>

          </div>  
        </div>

        <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

      </div>
    );
  }
}

export default App;
