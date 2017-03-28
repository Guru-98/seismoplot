var map;
var bounds;

function initMap() {
  var mapStyle = [{
        'featureType': 'all',
        'elementType': 'all',
        'stylers': [{'visibility': 'off'}]
      }, {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
      }, {
        'featureType': 'water',
        'elementType': 'labels',
        'stylers': [{'visibility': 'off'}]
      }, {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [{'visibility': 'on'}, {'hue': '#5f94ff'}, {'lightness': 60}]
      }, {
        'featureType': 'administrative.country',
        'elementType': 'geometry',
        'stylers': [{'visibility': 'on'}, {'color': ''} ]
      }];
  var options = {center: {lat: 20.5937, lng: 78.9629}, zoom: 4, disableDefaultUI: true, zoomControl: true, styles: mapStyle};
  map = new google.maps.Map(document.getElementById('map'), options);

  bounds = new google.maps.LatLngBounds(new google.maps.LatLng(6, 65), new google.maps.LatLng(35.956, 97.35));

  google.maps.event.addListener(map, 'dragend', restrict);
}

function restrict(){
  if (bounds.contains(map.getCenter())) return;

  var c=map.getCenter(),
  x=c.lng(),
  y=c.lat(),
  maxX = bounds.getNorthEast().lng(),
  maxY = bounds.getNorthEast().lat(),
  minX = bounds.getSouthWest().lng(),
  minY = bounds.getSouthWest().lat();

  if(x<minX) x=minX;
  if(x>maxX) x=maxX;
  if(y<minY) y=minY;
  if(y>maxY) y=maxY;

  map.setCenter(new google.maps.LatLng(y,x)); 
}

function recentEq(data){
  var rEqList = document.getElementById('recent-eq');
  map.data.loadGeoJson(data);
}