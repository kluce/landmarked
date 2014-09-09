L.mapbox.accessToken = 'pk.eyJ1Ijoia2x1Y2UiLCJhIjoiUGtZSHRqWSJ9.jualfg8qfIHQHuLsaKlOBw';
var map = L.mapbox.map('map', 'examples.map-i86nkdio')
    .setView([40, -74.50], 9);

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
      $.ajax({ // ajax call starts
          url: 'https://api.foursquare.com/v2/venues/search', // JQuery loads yelp.com
          data: 'near=San+Francisco&query=bicycle&intent=browse&radius=10000&limit=10&client_id=V1NRKMSBFKTLAHAFV10W0RI0OHB1XRCR3WQUQBQTQPTZI1OM&client_secret=0PWPU23OCQVRECKPBCQ4LEJTEPI4AO3SCTIRTPOL2SQ1A3OQ&v=20140909', // Send value of the clicked button
          dataType: 'jsonp', // Choosing a JSON datatype
          success: function(data) // Variable data contains the data we get from serverside
          {
                console.log(data);
                for (var venue in data.response.venues) {
                    console.log(venue.name);
                }
            }
        });
    });
});


