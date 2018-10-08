import React from 'react';
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {defaults as defaultControls, ScaleLine} from 'ol/control.js';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';

class MapEmbed extends React.Component {
	constructor() {
		super();
		this.state = {
			coordinates: null
		};
	}


	componentDidMount() {

		var entranceSource = new VectorSource({});
		var entranceLayer = new VectorLayer({
		  source: entranceSource

		});
		
		var scaleLineControl = new ScaleLine();

		const map = new Map({
		  target: this.refs.mapContainer,
		  layers: [
		    new TileLayer({
		      source: new OSM()
		    }),
		    entranceLayer
		  ],

			controls: defaultControls({
			    attributionOptions: ({
			      collapsible: true
			    })
			  }).extend([
			    scaleLineControl
			  ]),

		  view: new View({
		    center: fromLonLat([24.94, 60.17]),
		    zoom: 6
		  })
		});

//onClick function

	map.on('click', this.handleMapClick.bind(this));

	    // save map and layer references to local state
	    this.setState({ 
	      map: map,
	      entranceSource: entranceSource,
	      entranceLayer: entranceLayer,
	    });

 //end of didMount

	}

	// pass new features from props into the OpenLayers layer object
  // componentDidUpdate(prevProps, prevState) {
  //   this.state.entranceLayer.setSource(
  //     new VectorSource({
  //       features: this.props.routes
  //     })
  //   );
  // }

  handleMapClick(event) {

// derive map coordinate (references map from Wrapper Component state)
    this.setState({
    	coordinates: this.state.map.getCoordinateFromPixel(event.pixel)
    });

	alert(toLonLat(this.state.coordinates));
		var clickedCoordinate = toLonLat(this.state.coordinates);
		var longitude = clickedCoordinate[0];
		var latitude = clickedCoordinate[1];
	    // create Point geometry from clicked coordinate
    //var clickedPointGeom = new Point( this.state.coordinates );

	var newEntranceFeature = new Feature({
    geometry: new Point( this.state.coordinates ),
  });

	this.state.entranceSource.addFeature(newEntranceFeature);
	//passing entrance coordinates to parent component
	this.props.callbackFromParent(longitude, latitude);

	return clickedCoordinate

  }


	render () {
	    return (
	      <div ref="mapContainer"> </div>
	    );
	  }

}



export default MapEmbed;