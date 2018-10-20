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
import { getCenter, getBottomLeft, getTopRight } from 'ol/extent';

class MapEmbed extends React.Component {
	constructor() {
		super();
		this.state = {
	    map: null,
	    entranceSource: null,
	    entranceLayer: null,
	    entranceMarker: null
		};
	}


	componentDidMount() {
    var entranceMarker = new Feature({
			geometry: new Point(fromLonLat([24.94, 60.17]))
		});

		var iconStyle = new Style({
    	image: new Icon( ({
      anchor: [0.5, 16],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: icon//openlayers.org/en/v3.8.2/examples/data/icon.png'
    	}))
  	});

		entranceMarker.setStyle(iconStyle);

		var entranceSource = new VectorSource({
			features: [entranceMarker]
		});

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
		    center: fromLonLat([24.94, 60.17]),//user's position here
		    zoom: 6
		  })
		});

		this.setState({ 
      map: map,
      entranceSource: entranceSource,
      entranceLayer: entranceLayer,
      entranceMarker: entranceMarker
    });

    //map.on('moveend', this.handleMoveEnd.bind(this));
 //end of didMount

	}

	 //  componentDidUpdate(prevProps, prevState) {
  //   this.state.map.on('moveend', this.handleMapPan.bind(this));


  // }

  // handleMoveStart(event){
  // 	this.setState({entranceCoordinate: this.state.map.getView().getCenter()})
  // }

  handleMoveEnd(coordinate) {
  	// var extent = this.state.map.getView().calculateExtent(this.state.map.getSize());
  	// var bottomLeft = toLonLat(getBottomLeft(extent));
  	// var topRight = toLonLat(getTopRight(extent));
  	var entranceCoordinates = this.state.map.getView().getCenter();
		this.state.entranceMarker.getGeometry().setCoordinates(entranceCoordinates);

		// = new Feature({
		// 	geometry: new Point(entranceCoordinate)
		// });


// derive map coordinate (references map from Wrapper Component state)
		var lon = toLonLat(this.entranceCoordinates)[0];
		this.props.updateLongitude(lon);

		var lat = toLonLat(this.entranceCoordinates)[1];
		this.props.updateLatitude(lat);

	    //create Point geometry from clicked coordinate

		var newEntranceFeature = new Feature({
	    geometry: new Point( this.entranceCoordinates ),
	  });

		this.state.entranceSource.addFeature(newEntranceFeature);

  }



	render () {
	    return (
	      <div ref="mapContainer"> </div>
	    );
	  }

}



export default MapEmbed;