import React from 'react';
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import {defaults as defaultControls, ScaleLine} from 'ol/control.js';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import OSMXML from 'ol/format/OSMXML.js';
import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
import {transformExtent} from 'ol/proj.js';
import {Circle as CircleStyle, Fill, Stroke} from 'ol/style.js';
import {Icon, Style} from 'ol/style.js';
import {Draw, Snap} from 'ol/interaction.js';
import icon from './pin.png';

class MapEmbed extends React.Component {
	constructor() {
		super();
		this.state = {
	    map: null,
	    entranceSource: null,
	    entranceLayer: null,
			buildingSource: null,
			iconStyle: new Style({
				zIndex: 101,
				image: new Icon( ({
				anchor: [0.5, 32],
				anchorXUnits: 'fraction',
				anchorYUnits: 'pixels',
				src: icon
				}))
			})
		};
	}


	componentDidMount() {

		//building vector style
		var styles = {
			'building': {
	      '.*': new Style({
	        zIndex: 100,
	        stroke: new Stroke({
	          color: 'rgba(246, 99, 79, 1.0)',
	          width: 1
	        }),
	        fill: new Fill({
	          color: 'rgba(246, 99, 79, 0.3)'
	        })
	      })
	    }
		};

		//source of building vectors
		var buildingSource = new VectorSource({
			format: new OSMXML(),
        loader: function(extent, resolution, projection) {
          var epsg4326Extent = transformExtent(extent, projection, 'EPSG:4326');
          var client = new XMLHttpRequest();
          client.open('POST', 'https://overpass-api.de/api/interpreter');
          client.addEventListener('load', function() {
            var features = new OSMXML().readFeatures(client.responseText, {
              featureProjection: map.getView().getProjection()
            });
            buildingSource.addFeatures(features);
          });
          var query = '(node(' +
              epsg4326Extent[1] + ',' + epsg4326Extent[0] + ',' +
              epsg4326Extent[3] + ',' + epsg4326Extent[2] +
              ');rel(bn)->.foo;way(bn);node(w)->.foo;rel(bw););out meta;';
          client.send(query);
        },
        strategy: bboxStrategy
		});

			//create building vector layer
			var buildings = new VectorLayer({
        source: buildingSource,
        style: function(feature) {
          for (var key in styles) {
            var value = feature.get(key);
            if (value !== undefined) {
              for (var regexp in styles[key]) {
                if (new RegExp(regexp).test(value)) {
                  return styles[key][regexp];
                }
              }
            }
          }
          return null;
        }
      });


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
		    buildings, entranceLayer
		  ],

			controls: defaultControls({
			    attributionOptions: ({
			      collapsible: true
			    })
			  }).extend([
			    scaleLineControl
			  ]),

		  view: new View({
		    center: [2776308.10, 8437684.16], //fromLonLat([24.94, 60.17]),
		    maxZoom: 19,
		    zoom: 17
		  })
		});

		var EntranceDraw = {
			init: function() {
				map.addInteraction(this.Point);
				this.Point.setActive(true);
			},
			Point: new Draw({
				source: buildingSource,
				type: 'Point',
				style: this.state.iconStyle
			})
		};

		EntranceDraw.init();

		var EntranceSnap = new Snap({
			source: buildings.getSource()
		});

		map.addInteraction(EntranceSnap);

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

		var newEntranceFeature = new Feature({
	    geometry: new Point( clickedCoordinate ),
	  });
		
  	newEntranceFeature.setStyle(this.state.iconStyle);

		this.state.entranceSource.addFeature(newEntranceFeature);

  }


	render () {
	    return (
	      <div ref="mapContainer"> </div>
	    );
	  }

}



export default MapEmbed;