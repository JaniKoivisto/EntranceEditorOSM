var entranceSource = new ol.source.Vector({});
var entranceLayer = new ol.layer.Vector({
  source: entranceSource
});

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    entranceLayer
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([24.94, 60.17]),
    zoom: 6
  })
});

map.on('singleclick', function(event) {
  entranceSource.clear();
  var coordinates = event.coordinate;
  var newEntranceFeature = new ol.Feature({
    geometry: new ol.geom.Point(coordinates),
  });
  entranceSource.addFeature(newEntranceFeature);
});