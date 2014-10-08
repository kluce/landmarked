L.mapbox.accessToken = 'pk.eyJ1Ijoia2x1Y2UiLCJhIjoiUGtZSHRqWSJ9.jualfg8qfIHQHuLsaKlOBw';
var map = L.mapbox.map('map', 'examples.map-i86nkdio')
    .setView([37.775, -122.418333333333], 10);



map.on('mouseup', function(e) {
  //updateMap();
  var center = map.getCenter();


  updateMap(center.lat, center.lng);

});

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


// Initially filter the markers
change();

$(document).ready(function() {


    updateMap(37.775, -122.418333333333);
});



function updateMap(latitude, longitude){
      $("#list").html("");
      

      var query = "bloody+mary";
      $.ajax({ // ajax call starts
          url: 'https://api.foursquare.com/v2/venues/explore', // JQuery loads foursquare.com
          data: 'll='+ latitude + ',' + longitude + '&query='+  query +'&venuePhotos=1&intent=browse&radius=10000&limit=10&client_id=V1NRKMSBFKTLAHAFV10W0RI0OHB1XRCR3WQUQBQTQPTZI1OM&client_secret=0PWPU23OCQVRECKPBCQ4LEJTEPI4AO3SCTIRTPOL2SQ1A3OQ&v=20140909', // Send value of the clicked button
          dataType: 'jsonp', // Choosing a JSON datatype
          success: function(data) // Variable data contains the data we get from serverside
          {

              

                console.log(data);
                // for (var venue in data.response.venues) {
                for(var i = 0; i < data.response.groups[0].items.length; i++) {
                  console.log(data.response.groups[0].items[i]);
                  var lat =   data.response.groups[0].items[i].venue.location.lat;
                  var lng =   data.response.groups[0].items[i].venue.location.lng;
                  var name = data.response.groups[0].items[i].venue.name;
                  var address = data.response.groups[0].items[i].venue.location.address;
                  var city = data.response.groups[0].items[i].venue.location.city;
                  var status = data.response.groups[0].items[i].venue.hours.status;
                  if(status === undefined) status = ""; 
                  var url = data.response.groups[0].items[i].venue.url;
                  var pre = data.response.groups[0].items[i].venue.photos.groups[0].items[0].prefix;
                  var suf = data.response.groups[0].items[i].venue.photos.groups[0].items[0].suffix;
                  var image = pre + "300x500" + suf;

                  console.log(image);
                  //var image = data.response.groups[0].items[i].venue.photos.groups[0].items[0].prefix.;


                  console.log(lat);
                  var title = "<h1>" + name + "</h1>";
                  var description = "<p>" + address + "</p>";
                  description += "<p>" + city + "</p>";
                  description += "<h6>" + status + "</h6>";
                  description += "<a href='"+ url +"' target='_blank' class='raleway' >" + url + "</a>";
                  // "<a href='"+ bar +"'>" + foo + "</a>"
                    console.log("{" + lat + "," + lng + "}");
                    

                  var row = "<div class='row row-pad'><div class='col-xs-3'>" + "<img src='" + image + "' class='img img-rounded' width='60px' height='60px'/>" + "</div><div class='col-xs-9 content-right'>" + "<h3>" + name + "</h3>" + "<p>" + address + "</p>" + "<p>" + city+ "</p>" +"<p>" + status + "</p>" + "<a href='"+ url +"'>" + url + "</a>" + "</div></div>";                   
                  $("#list").append(row);
          var myLayer = L.mapbox.featureLayer().addTo(map);

          var geoJson = [{
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
                  //'marker-size': 'large',
                  //'marker-color': '#BE9A6B',
                  //'marker-symbol': 'cafe',
                  "icon": {
                      "iconUrl": "/img/icon.png",
                      "iconSize": [50, 50], // size of the icon
                      "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                      "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                      "className": "dot"
                  }

              }
          }];

            // Set a custom icon on each marker based on feature properties.
          myLayer.on('layeradd', function(e) {
              var marker = e.layer,
                  feature = marker.feature;

              marker.setIcon(L.icon(feature.properties.icon));
          });

          myLayer.setGeoJSON(geoJson);
                }
            }

    });
}




