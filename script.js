L.mapbox.accessToken = 'pk.eyJ1Ijoia2x1Y2UiLCJhIjoiUGtZSHRqWSJ9.jualfg8qfIHQHuLsaKlOBw';
var map = L.mapbox.map('map', 'examples.map-i86nkdio')
    .setView([37.775, -122.418333333333], 10);






var filters = document.getElementById('filters');
var checkboxes = document.getElementsByClassName('filter');

function change() {
    // Find all checkboxes that are checked and build a list of their values
    var on = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) on.push(checkboxes[i].value);
    }
    // The filter function takes a GeoJSON feature object
    // and returns true to show it or false to hide it.
    map.featureLayer.setFilter(function (f) {
        // check each marker's symbol to see if its value is in the list
        // of symbols that should be on, stored in the 'on' array
        return on.indexOf(f.properties['marker-symbol']) !== -1;
    });
    return false;
}

// When the form is touched, re-filter markers
filters.onchange = change;
// Initially filter the markers
change();

$(document).ready(function(){
  $('.filter').on('click', function() { // This event fires when a button is clicked
      var button = $(this).val();
      var query = "bloody%20mary";
      $.ajax({ // ajax call starts
          url: 'https://api.foursquare.com/v2/venues/search', // JQuery loads foursquare.com
          data: 'near=San+Francisco&query='+  query +'&intent=browse&radius=10000&limit=10&client_id=V1NRKMSBFKTLAHAFV10W0RI0OHB1XRCR3WQUQBQTQPTZI1OM&client_secret=0PWPU23OCQVRECKPBCQ4LEJTEPI4AO3SCTIRTPOL2SQ1A3OQ&v=20140909', // Send value of the clicked button
          dataType: 'jsonp', // Choosing a JSON datatype
          success: function(data) // Variable data contains the data we get from serverside
          {

          		

                console.log(data);
                // for (var venue in data.response.venues) {
                for(var i = 0; i < data.response.venues.length; i++) {
                	var lat = 	data.response.venues[i].location.lat;
                	var lng = 	data.response.venues[i].location.lng;
                	var title = data.response.venues[i].name;
                	var description = data.response.venues[i].location.address;
                    console.log("{" + lat + "," + lng + "}");

					L.mapbox.featureLayer({
					    // this feature is in the GeoJSON format: see geojson.org
					    // for the full specification
					    type: 'Feature',
					    geometry: {
					        type: 'Point',
					        // coordinates here are in longitude, latitude order because
					        // x, y is the standard for GeoJSON and many formats
					        coordinates: [
					          lng,
					          lat,
					        ]
					    },
					    properties: {
					        title: title,

					        description: description,
					        // one can customize markers by adding simplestyle properties
					        // https://www.mapbox.com/foundations/an-open-platform/#simplestyle
					        'marker-size': 'large',
					        'marker-color': '#e74c3c',
					        'marker-symbol': 'cafe'

					    }
					}).addTo(map);



                }
            }
        });
    });
});




