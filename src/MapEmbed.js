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
import {Icon, Style} from 'ol/style.js';
import icon from './pin.png';

class MapEmbed extends React.Component {
	constructor() {
		super();
		this.state = {
	    map: null,
	    entranceSource: null,
	    entranceLayer: null,
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
    var clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);

		var lon = toLonLat(clickedCoordinate)[0];
		this.props.updateLongitude(lon);

		var lat = toLonLat(clickedCoordinate)[1];
		this.props.updateLatitude(lat);
	    // create Point geometry from clicked coordinate
    //var clickedPointGeom = new Point( this.state.coordinates );

	var newEntranceFeature = new Feature({
    geometry: new Point( clickedCoordinate ),
  });

  var iconStyle = new Style({
    	image: new Icon( ({
      anchor: [0.5, 32],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: icon//openlayers.org/en/v3.8.2/examples/data/icon.png'
    	}))
  	});

  	newEntranceFeature.setStyle(iconStyle);

	this.state.entranceSource.addFeature(newEntranceFeature);

  }


	render () {
	    return (
	      <div ref="mapContainer"> </div>
	    );
	  }

}



export default MapEmbed;