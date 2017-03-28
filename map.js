function initMap() {

  var coimbatore= {lat: 11.0168, lng: 76.9558};
  var chennai= {lat: 13.21, lng: 80.5258};  
  var delhi={lat: 28.7041, lng: 77.1025};
	var bangalore={lat: 12.9716, lng: 77.525};
	var haryana={lat: 29.45, lng: 76.02}; 
	var jaipur={lat: 26.91, lng: 75.81};	
   
  var options = {center: {lat: 20.5937, lng: 78.9629}, zoom: 4, disableDefaultUI: true, zoomControl: true};
  var map = new google.maps.Map(document.getElementById('map'), options);

  var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(6, 65), new google.maps.LatLng(35.956, 97.35));

 var marker = new google.maps.Marker({position: coimbatore,  map: map,title: 'coimbatore(Manchester of SI)'});
 var marker1 = new google.maps.Marker({position: chennai, map: map, title: 'chennai(capital of TN)'});
 var marker2 = new google.maps.Marker({position: delhi, map: map, title: 'delhi(capital of India)'});
 var marker3 = new google.maps.Marker({position: bangalore, map: map, title: 'bangalore(capital of karnataka)'});
var marker4 = new google.maps.Marker({position: haryana, map: map, title: 'haryana(capital of punjab)'})
var marker5 = new google.maps.Marker({position: jaipur, map: map, title: 'jaipur(capital of Rajasthan)'})

        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Coimbatore</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Coimbatore</b>, also referred to as <b>Manchester of South India</b> , ' +
            'lat 11.0168 , lng 76.9558 ' +
             '</div>'+
            '</div>';
	var infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 300
	
        });
    

	var contentString1 = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Chennai</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Chennai</b>, also referred to as <b>capital of Tamil Nadu</b> , ' +
            'lat 13.21 , lng 80.52 ' +
            '</div>'+
            '</div>';

        var infowindow1 = new google.maps.InfoWindow({
          content: contentString1,
          maxWidth: 300
	
        });
       var contentString2 = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Delhi</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Delhi</b>, also referred to as <b>capital of India</b> , ' +
            'lat: 28.7041, lng: 77.1025 ' +
            '</div>'+
            '</div>';
	
          var infowindow2 = new google.maps.InfoWindow({
          content: contentString2,
          maxWidth: 300
	
        });
	var contentString3 = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Bangalore</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Bangalore</b>, also referred to as <b>capital of karnataka</b> , ' +
            'lat: 12.9716, lng: 77.525 ' +
            '</div>'+
            '</div>';

        var infowindow3 = new google.maps.InfoWindow({
          content: contentString3,
          maxWidth: 300
	
        });
	var contentString4 = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Haryana</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Haryana</b>, also referred to as <b>capital of punjab</b> , ' +
            'lat: 29.45, lng: 76.02 ' +
            '</div>'+
            '</div>';

        var infowindow4 = new google.maps.InfoWindow({
          content: contentString4,
          maxWidth: 300
	
        });
	var contentString5 = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Jaipur</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Jaipur</b>, also referred to as <b>capital of Rajasthan</b> , ' +
            'lat 26.91 , lng 75.81 ' +
            '</div>'+
            '</div>';

        var infowindow5 = new google.maps.InfoWindow({
          content: contentString5,
          maxWidth: 300
	
        });


        var marker = new google.maps.Marker({
          position:coimbatore,
          map: map,
          title: 'coimbatore(Manchester of India)'
                 
        });
          var marker1 = new google.maps.Marker({	
          position:chennai,
          map: map,
          title: 'chennai(captital of Tn)'
          

        });
         var marker2 = new google.maps.Marker({
          position:delhi,
          map: map,
          title: 'delhi(captital of India)'
          
        });
	var marker3 = new google.maps.Marker({
          position:bangalore,
          map: map,
          title: 'bangalore(captital of karnataka)'
          
        });
         var marker4 = new google.maps.Marker({
          position:haryana,
          map: map,
          title: 'haryana(captital of punjab)'
          
        });
	 var marker5 = new google.maps.Marker({
	           position:jaipur,
          map: map,
          title: 'jaipur(captital of rajsathan)'
          
        });                   
        marker.addListener('mouseover', function() {
          infowindow.open(map, marker);
       });
         marker.addListener('mouseout', function() {
          infowindow.close(map, marker); 
          });
	  
        marker1.addListener('mouseover', function() {
          infowindow1.open(map, marker1);
       });
         marker1.addListener('mouseout', function() {
          infowindow1.close(map, marker1); 
          });
         
         marker2.addListener('mouseover', function() {
          infowindow2.open(map, marker2);
       });
         marker2.addListener('mouseout', function() {
          infowindow2.close(map, marker2); 
          });
	 marker3.addListener('mouseover', function() {
          infowindow3.open(map, marker3);
       });
         marker3.addListener('mouseout', function() {
          infowindow3.close(map, marker3); 
          });
	 marker4.addListener('mouseover', function() {
          infowindow4.open(map, marker4);
       });
         marker4.addListener('mouseout', function() {
          infowindow4.close(map, marker4); 
          });
 	 marker5.addListener('mouseover', function() {
          infowindow5.open(map, marker5);
       });
         marker5.addListener('mouseout', function() {
          infowindow5.close(map, marker5); 
          });
          
  google.maps.event.addListener(map, 'dragend', function()
  {
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
