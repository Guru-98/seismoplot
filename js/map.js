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
        'stylers': [{'visibility': 'on'}, {'color': '#a0a0a0'} ]
      }];
  var options = {center: {lat: 20.5937, lng: 78.9629}, zoom: 4, disableDefaultUI: true, zoomControl: true, styles: mapStyle};
  map = new google.maps.Map(document.getElementById('map'), options);

  bounds = new google.maps.LatLngBounds(new google.maps.LatLng(6, 65), new google.maps.LatLng(35.956, 97.35));

  google.maps.event.addListener(map, 'dragend', restrict);
  google.maps.event.addListener(map, 'drag', restrict);
  google.maps.event.addListener(map, 'resize', restrict);
}

//TODO redefine restriction
function restrict(){
  if (bounds.equals(map.getBounds())) return;
  map.fitBounds(bounds); 
}

function recentEq(response){
  var rEqList = document.getElementById('recent-eq');
  rEqList = rEqList.appendChild(document.createElement("ul"));
  rEqList.className += "list-group";
  for (var i in response.features){
    var eq = document.createElement("li");
    eq.className += "list-group-item";
    var eqEvent = document.createElement("button");
    eqEvent.className +="list-group-item list-group-item-action";
    eqEvent.setAttribute("onclick","loadEqEvent(\"" + response.features[i].properties.detail + "\")");
    var title = document.createTextNode(response.features[i].properties.title);
    eqEvent.appendChild(title);
    eq.appendChild(eqEvent);
    rEqList.appendChild(eq);
  }
}

function loadEqEvent(url) {
  var script = document.createElement('script');
  script.src = url+"&callback=loadPoint";
  document.body.appendChild(script);
}

function loadPoint(response) {
  var iW, clicked=false;
  map.data.forEach(function (f) {
    map.data.remove(f);
  });
  map.data.addGeoJson(response);
  map.data.addListener("mouseover",function (event) {
    var mag = event.feature.getProperty("mag").toString();
    iW = new google.maps.InfoWindow({content: "<li>Magnitude: "+mag+"</li><li>Url: <a href=\""+event.feature.getProperty("url").toString()+"\">Details</li>", maxWidth: 300, position: event.latLng, pixelOffset: new google.maps.Size(0,-25)});
    iW.open(map);
  });
  map.data.addListener("click",function (event) {
    clicked = true;
  })
  map.data.addListener("mouseout",function (event) {
    if(!clicked)
      iW.close();
  })
}