import React from 'react';
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import OSMXML from 'ol/format/OSMXML.js';
import {fromLonLat,toLonLat} from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {defaults as defaultControls, ScaleLine} from 'ol/control.js';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {Icon, Style} from 'ol/style.js';
import icon from './pin.png';
import Geolocation from 'ol/Geolocation.js';
import {transformExtent} from 'ol/proj.js';
import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';

class MapEmbed extends React.Component {
	constructor() {
		super();
		this.state = {
			map: null,
			entranceSource: null,
			entranceLayer: null,
			entranceMarker: null,
			geolocation: null,
			buildings: null,
			buildingSource: null
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
				src: icon
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
		
		var buildingSource = new VectorSource({
			format: new OSMXML(),
			loader: function(extent, resolution, projection) {
				var epsg4326Extent = transformExtent(extent, projection, 'EPSG:4326');
				
				var client = new XMLHttpRequest();
				
				client.open('GET', process.env.REACT_APP_API_URL + '/api/osmData?x=' + epsg4326Extent[1] + '&y=' + epsg4326Extent[0] +
							'&xx=' + epsg4326Extent[3] + '&yy=' + epsg4326Extent[2]);
				client.addEventListener('load', function() {
					var features = new OSMXML().readFeatures(client.responseText, {
						featureProjection: map.getView().getProjection()
					});
					buildingSource.addFeatures(features);
				});
				client.send();
			},
			strategy: bboxStrategy
		});

		var buildings = new VectorLayer({
			source: buildingSource
		});
		
		var scaleLineControl = new ScaleLine();
		
		const map = new Map({
			target: this.refs.mapContainer,
			layers: [
				new TileLayer({
					source: new OSM()
				}),
				buildings,
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
				zoom: 18,
				minZoom: 17
			})
		});

		var geolocation = new Geolocation({
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
			geolocation: geolocation,
			buildings: buildings,
			buildingSource: buildingSource
		});
		
		map.on('pointerdrag', this.handleMapPan.bind(this));
		map.on('postrender', this.handleMapPan.bind(this));
		
		geolocation.on('change:position', this.handleGeolocation.bind(this));

	}
	
	handleMapPan(coordinate) {
		var centerPoint = this.state.map.getView().getCenter();
		var entranceCoordinates = centerPoint
		this.state.entranceMarker.getGeometry().setCoordinates(entranceCoordinates);

		var lon = toLonLat(entranceCoordinates)[0];
		this.props.updateLongitude(lon);
		
		var lat = toLonLat(entranceCoordinates)[1];
		this.props.updateLatitude(lat);

		var closest = this.state.buildingSource.getFeaturesAtCoordinate(centerPoint);
		if (closest[0]) {
			var snapTo = closest[0].getGeometry().getClosestPoint(centerPoint);
			this.state.map.getView().setCenter(snapTo);
		}
	}
	
	handleGeolocation(geolocation) {
		var userPosition = this.state.geolocation.getPosition()
		// Disable tracking option after initial load
		this.state.geolocation.setTracking(false);
		this.state.map.getView().setCenter(userPosition);
	}
	
	render () {
		return (
			<div ref="mapContainer" style={{width: '100%', height: '100%', position:'fixed'}}></div>
			);
		}
	}
	
	export default MapEmbed;