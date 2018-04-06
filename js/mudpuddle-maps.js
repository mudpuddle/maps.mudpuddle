// mapbox gl version
var map;
var myLatLng;
var geocoder;
var zoom;
function initialize() {
  geocoder = new google.maps.Geocoder();

  myLatLng = [-120.5, 44.14];
  zoom = 7;

  mapboxgl.accessToken = 'pk.eyJ1IjoibXVkcHVkZGxlIiwiYSI6IjJjeEdfRDgifQ.FuEb3wc45Kl4LfEe3Qe_uQ';
  map = new mapboxgl.Map({
    container: 'map-canvas', // container id
    style: 'mapbox://styles/mapbox/outdoors-v10', // stylesheet location
    center: myLatLng, // starting position [lng, lat]
    zoom: zoom // starting zoom
  });

  // map.on('load', updateGeocoderProximity);
  // map.on('moveend', updateGeocoderProximity);

  doGeolocation();
}

function updateGeocoderProximity() {
    // proximity is designed for local scale, if the user is looking at the whole world,
    // it doesn't make sense to factor in the arbitrary centre of the map
    if (map.getZoom() > 9) {
        var center = map.getCenter().wrap(); // ensures the longitude falls within -180 to 180 as the Geocoding API doesn't accept values outside this range
        geocoder.setProximity({ longitude: center.lng, latitude: center.lat });
    } else {
        geocoder.setProximity(null);
    }
}

function doGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    } else {
        positionError(-1);
    }
}

function positionError(err) {
    var msg;
    switch(err.code) {
        case err.UNKNOWN_ERROR:
            msg = "Unable to find your location";
            break;
        case err.PERMISSION_DENINED:
            msg = "Permission denied in finding your location";
            break;
        case err.POSITION_UNAVAILABLE:
            msg = "Your location is currently unknown";
            break;
        case err.BREAK:
            msg = "Attempt to find location took too long";
            break;
        default:
            msg = "Location detection not supported in browser";
    }
    document.getElementById('info').innerHTML = msg;
    setTimeout(function () {
        $('#info').stop().fadeTo("slow", 0.001);
    }, 5000);
}

function positionSuccess(position) {
    // Center the map on the new location
    var coords = position.coords || position.coordinate || position;
    myLatLng = [coords.longitude, coords.latitude]; //new google.maps.LatLng(coords.latitude, coords.longitude);
    map.setCenter(myLatLng);
    zoom = 12;
    map.setZoom(zoom);
    document.getElementById('info').innerHTML = 'Location successfully detected';
    setTimeout(function () {
        $('#info').stop().fadeTo("slow", 0.001);
    }, 5000);
}

function codeLocation(addHistory) {
  var address = document.getElementById('location').value;
  $('#location').val('');
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
    map.flyTo({
        center: [results[0].geometry.location.lng(), results[0].geometry.location.lat()]
      })
      if (zoom < 12) {
        map.setZoom(12);
      }
      if (addHistory) {
        addAlert(address, 'success', 'listLocation', true);
      }
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function resetMap() {
    map.setCenter(myLatLng);
    map.setZoom(zoom);
}

function printMap() {
    var currentLoc = map.getCenter();
    var currentZoom = map.getZoom();
    return newWindow = window.open(
      "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/static/" + currentLoc.lng + "," + currentLoc.lat + "," + currentZoom + ",0,0/600x600?access_token=pk.eyJ1IjoibXVkcHVkZGxlIiwiYSI6IjJjeEdfRDgifQ.FuEb3wc45Kl4LfEe3Qe_uQ",
      "_blank",
      "toolbar=yes,width=750,height=750"
    );
}
