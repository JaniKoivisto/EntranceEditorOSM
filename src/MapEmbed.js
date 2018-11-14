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
import { getCenter } from 'ol/extent';
import Geolocation from 'ol/Geolocation.js';

class MapEmbed extends React.Component {
	constructor() {
		super();
		this.state = {
			map: null,
			entranceSource: null,
			entranceLayer: null,
			entranceMarker: null,
			geolocation: null
		};
	}
	
	
	componentDidMount() {
		var entranceMarker = new Feature({
			geometry: new Point(fromLonLat([24.94, 60.17]))
		});
		
		var iconStyle = new Style({
			image: new Icon( ({
				anchor: [0.5, 32],
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
			updateWhileInteracting: true,
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
				zoom: 18
			})
		});

	  var geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true
      },
      projection: map.getView().getProjection()
    });

    geolocation.setTracking(true);
		
		this.setState({ 
			map: map,
			entranceSource: entranceSource,
			entranceLayer: entranceLayer,
			entranceMarker: entranceMarker,
			geolocation: geolocation
		});
		
		//detect center change
		map.on('pointerdrag', this.handleMapPan.bind(this));
		map.on('postrender', this.handleMapPan.bind(this));

		geolocation.on('change:position', this.handleGeolocation.bind(this));
		
		//end of didMount
	}
	
	
	handleMapPan(coordinate) {
		
		//var extent = this.state.map.getView().calculateExtent(this.state.map.getSize());
		var entranceCoordinates = this.state.map.getView().getCenter();
		//console.log(entranceCoordinates);
		this.state.entranceMarker.getGeometry().setCoordinates(entranceCoordinates);
		
		
		// derive map coordinate (references map from Wrapper Component state)
		var lon = toLonLat(entranceCoordinates)[0];
		this.props.updateLongitude(lon);
		
		var lat = toLonLat(entranceCoordinates)[1];
		this.props.updateLatitude(lat);
		
	}

	handleGeolocation(geolocation) {
		var userPosition = this.state.geolocation.getPosition()
		// disable tracking option after initial load
		this.state.geolocation.setTracking(false);
		// var newUserPosition = new Feature({
	 //    geometry: new Point( userPosition ),
	 //  });

		//this.state.entranceSource.addFeature(newUserPosition);
		this.state.map.getView().setCenter(userPosition);
	}
	
	
	render () {
		return (
			<div ref="mapContainer" style={{width: '100%', height: '100%', position:'fixed'}}></div>
			);
		}

	}
	
	
	
	export default MapEmbed;