var map;
var bounds;
var circle;

function popMap() {
  var mapStyle = [{
    'featureType': 'all',
    'elementType': 'all',
    'stylers': [{ 'visibility': 'off' }]
  }, {
    'featureType': 'landscape',
    'elementType': 'geometry',
    'stylers': [{ 'visibility': 'on' }, { 'color': '#fcfcfc' }]
  }, {
    'featureType': 'water',
    'elementType': 'labels',
    'stylers': [{ 'visibility': 'off' }]
  }, {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [{ 'visibility': 'on' }, { 'hue': '#5f94ff' }, { 'lightness': 60 }]
  }, {
    'featureType': 'administrative.country',
    'elementType': 'geometry',
    'stylers': [{ 'visibility': 'on' }, { 'color': '#a0a0a0' }]
  }];
  var options = { center: { lat: 20.5937, lng: 78.9629 }, zoom: 4, disableDefaultUI: true, zoomControl: true, styles: mapStyle };
  map = new google.maps.Map(document.getElementById('map'), options);

  bounds = new google.maps.LatLngBounds(new google.maps.LatLng(6, 65), new google.maps.LatLng(35.956, 97.35));

  google.maps.event.addListener(map, 'dragend', restrict);
  google.maps.event.addListener(map, 'drag', restrict);
  google.maps.event.addListener(map, 'resize', restrict);
  var MMI = [7, 6, 6, 6, 5, 5, 5, 5, 5, 4];
  var rad = [5,10,15,20,25,30,35,40,45,50];
  conCircle(MMI,rad);
}

//TODO redefine restriction
function restrict() {
  if (bounds.equals(map.getBounds())) return;
  map.fitBounds(bounds);
}

function recentEq(response) {
  var rEqList = document.getElementById('recent-eq');
  rEqList = rEqList.appendChild(document.createElement("ul"));
  rEqList.className += "list-group";
  for (var i in response.features) {
    var eq = document.createElement("li");
    eq.className += "list-group-item";
    var eqEvent = document.createElement("button");
    eqEvent.className += "list-group-item list-group-item-action";
    eqEvent.setAttribute("onclick", "loadEqEvent(\"" + response.features[i].properties.detail + "\")");
    var title = document.createTextNode(response.features[i].properties.title);
    eqEvent.appendChild(title);
    eq.appendChild(eqEvent);
    rEqList.appendChild(eq);
  }
}

function loadEqEvent(url) {
  var script = document.createElement('script');
  script.src = url + "&callback=loadPoint";
  document.body.appendChild(script);
}

function loadPoint(response) {
  var iW, clicked = false;
  map.data.forEach(function (f) {
    map.data.remove(f);
    circle.setMap(null);
  });
  circle = new google.maps.Circle({
    map: map,
    center: { lat: response.geometry.coordinates[1], lng: response.geometry.coordinates[0] },
    radius: response.properties.mag * 30000
  });
  map.data.addGeoJson(response);
  var mag = response.properties.mag;
  map.data.addListener("mouseover", function (event) {
    var place = event.feature.getProperty("place").toString();
    var time = event.feature.getProperty("time").toString();
    var url = event.feature.getProperty("url").toString();
    var mag = event.feature.getProperty("mag").toString();
    var info = "<b>Place: " + place + "</b><li>Time: " + time + "</li><li>url: " + url + "</li><li>Mag: " + mag + "</li>";
    iW = new google.maps.InfoWindow({ content: info, maxWidth: 300, position: event.latLng, pixelOffset: new google.maps.Size(0, -25) });
    iW.open(map);
  });
  map.data.addListener("click", function (event) {
    clicked = true;
  });
  map.data.addListener("mouseout", function (event) {
    if (!clicked)
      iW.close();
  });
}

function conCircle(MMI,rad) {
  var mC,iW;
  var grad = [rgb(255, 255, 255), rgb(191, 204, 255), rgb(160, 230, 255), rgb(128, 255, 255), rgb(122, 255, 147), rgb("255,255,0"), rgb(255, 200, 0), rgb(255, 200, 0), rgb(255, 145, 0), rgb(255, 0, 0), rgb(255, 145, 0), rgb(255, 0, 0), rgb(200, 0, 0), rgb(128, 0, 0)];
  for (var k in rad) {
    mC = new google.maps.Circle({
      center: { lat: 20.5937, lng: 78.9629 },
      fillColor: grad[MMI[k]-1],
      fillOpacity: 0.5,
      strokeWeight: 0,
      radius: rad[k] * 10000,
      map: map,
      zIndex: rad.length - k
    });
    google.maps.event.addListener(mC, "mouseover", function (e) {
        iW = new google.maps.InfoWindow({
        content: "MMI: " + MMI[k],
        maxWidth: 300,
        position: e.latLng
      });
      iW.open(map);
    });
    google.maps.event.addListener(mC, "mouseout", function (e) {
      iW.close();
    });
  }
}

function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}