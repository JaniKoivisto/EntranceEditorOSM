var entranceSource = new ol.source.Vector({});
var entranceLayer = new ol.layer.Vector({
  source: entranceSource
});

var scaleLineControl = new ol.control.ScaleLine();

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    entranceLayer
  ],
  controls: ol.control.defaults({
    attributionOptions: ({
      collapsible: true
    })
  }).extend([
    scaleLineControl
  ]),
  view: new ol.View({
    // Map and coordinates in WGS84-looks weird
    // projection: 'EPSG:4326',
    // center: [24.94, 60.17],
    center: ol.proj.fromLonLat([24.94, 60.17]),
    zoom: 6
  })
});

map.on('singleclick', function (event) {
  entranceSource.clear();
  coordinates = event.coordinate;
  var newEntranceFeature = new ol.Feature({
    geometry: new ol.geom.Point(coordinates),
  });
  entranceSource.addFeature(newEntranceFeature);
  writeCoor(coordinates);
});

function writeCoor(array){
  var displayCoor = document.getElementById("nodeCoordinates");
  displayCoor.innerHTML = ol.proj.toLonLat(array);
};






