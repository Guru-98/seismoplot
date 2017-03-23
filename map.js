function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {center: {lat: 20.5937, lng: 78.9629}, zoom: 4});

  var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(6, 65), new google.maps.LatLng(35.956, 97.35));

  google.maps.event.addListener(map, 'dragend', function(){
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
  });
}
