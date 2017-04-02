var map;
var bounds;
var circle;
var grad = ["rgb(255, 255, 255)", "rgb(191, 204, 255)", "rgb(160, 230, 255)", "rgb(128, 255, 255)", "rgb(122, 255, 147)", "rgb(255,255,0)", "rgb(255, 200, 0)", "rgb(255, 200, 0)", "rgb(255, 145, 0)", "rgb(255, 0, 0)", "rgb(255, 145, 0)", "rgb(255, 0, 0)", "rgb(200, 0, 0)", "rgb(128, 0, 0)"];
var mC = [], cMMI=[];
var uPos;

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
  //google.maps.event.addListener(map, 'zoom_changed', zoom_restrict);

  var legend = document.getElementById('mmiScale');
  map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(legend);
  
  var chart1 = document.getElementById('CI');
  var chart2 = document.getElementById('CII');
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(chart1);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(chart2);
}

//TODO redefine restriction
function restrict() {
  if (bounds.equals(map.getBounds())){ ;return};
  map.fitBounds(bounds);
}

function recentEq(response) {
  var rEqList = document.getElementById('recent-eq');
  rEqList = rEqList.appendChild(document.createElement("ul"));
  rEqList.className += "list-group";
  for (var i in response.features) {
    if (response.features[i].properties.mag > 5 || true ){
      var eq = document.createElement("li");
      eq.className += "list-group-item";
      var eqEvent = document.createElement("button");
      eqEvent.className += "list-group-item list-group-item-action";
      eqEvent.setAttribute("onclick", "loadEqEvent(\"" + response.features[i].properties.detail + "\")");
      var title = document.createTextNode(response.features[i].properties.title);
      var dyfi = document.createElement('a');
      dyfi.className += "dyfiLink";
      dyfi.appendChild(document.createTextNode('DYFI?'));
      dyfi.setAttribute("onclick", "dyfi()");
      eqEvent.appendChild(title);
      eqEvent.appendChild(document.createElement('br'));
      eqEvent.appendChild(dyfi);
      eq.appendChild(eqEvent);
      rEqList.appendChild(eq);
    }
  }
}

function loadEqEvent(url) {
  var script = document.createElement('script');
  script.src = url + "&callback=plotIso";
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

  var mag = response.properties.mag;
  map.data.addListener("mouseover", function (event) {
    var place = event.feature.getProperty("place").toString();
    var time = event.feature.getProperty("time").toString();
    var url = event.feature.getProperty("url").toString();
    var mag = event.feature.getProperty("mag").toString();
    var info = "<b>Place: " + place + "</b><li>Time: " + time + "</li><li>Mag: " + mag + "</li><li><a herf=\"" + url + "\">More Info</li>";
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

function conCircle(center, MMI, rad) {
  var iW;
  for (var h in mC) {
    mC[h].setMap(null);
    google.maps.event.clearListeners(mC[h], 'mouseover');
    google.maps.event.clearListeners(mC[h], 'mouseout');
  }
  mC=[];
  for (var k in rad) {
    mC.push(new google.maps.Circle({
      center: center,
      fillColor: grad[MMI[k] - 1],
      fillOpacity: 0.5,
      strokeWeight: 1,
      strokeColor: grad[MMI[k] - 1],
      radius: rad[k] * 1000,
      map: map,
      zIndex: rad.length - k
    }));

    google.maps.event.addListener(mC[k], "mouseover", function (e) {
      iW = new google.maps.InfoWindow({
        content: "MMI: " + (grad.findIndex(x => x === this.fillColor) + 1),
        maxWidth: 300,
        position: e.latLng
      });
      iW.open(map);
    });
    google.maps.event.addListener(mC[k], "mouseout", function (e) {
      iW.close();
    });
  }
  map.panTo(center);
  //map.fitBounds(mC[mC.length - 1].getBounds());
}

function plotIso(response) {
  var MMI = [], rad = [];
  var center = { lat: response.geometry.coordinates[1], lng: response.geometry.coordinates[0] };
  var mag1 = response.properties.mag;
  var focal = parseFloat(response.properties.products.origin[0].properties.depth);
  var ei = 1.5 * mag1 - 3.5 * Math.log10(focal) + 3;
  for (var r = 5; r <= 500; r = r + 50) {
    var i = ei - (3.6) * Math.log10(Math.sqrt(1 + ((r / focal) ^ 2)));
    rad.push(r);
    MMI.push(Math.round(i));
  }

  conCircle(center, MMI, rad);
}

function dyfi() {
  getLoc();
  openNav();
}

function getLoc() {
  if(navigator.geolocation.getCurrentPosition(function (p) {
    uPos = {lat: p.coords.latitude,lng: p.coords.longitude};
  }));
}

function openNav() {
    document.getElementById("dyfi").style.width = "100%";
}

function closeNav() {
    document.getElementById("dyfi").style.width = "0%";
}

function intense(val) {
  var marker = new google.maps.Marker({ position: uPos, map: map, label: val.toString()});
  var mark = new google.maps.Circle({ center: uPos, map: map, radius: val*1000, strokeWeight: 0, fillColor: grad[val]});
   google.maps.event.addListener(mark, "mouseover", function (e) {
      iW = new google.maps.InfoWindow({
        content: "MMI: " + (grad.findIndex(x => x === this.fillColor) + 1),
        maxWidth: 300,
        position: e.latLng
      });
      iW.open(map);
    });
    google.maps.event.addListener(mark, "mouseout", function (e) {
      iW.close();
    });
  uPos =null;
  closeNav();
}