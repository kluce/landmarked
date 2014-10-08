$(document).ready(function(){

      var button = $(this).val();
      var query = "bloody+mary";
      $.ajax({ // ajax call starts
          url: 'https://api.foursquare.com/v2/venues/explore', // JQuery loads foursquare.com
          data: 'near=San+Francisco&query='+  query +'&intent=browse&radius=10000&limit=10&client_id=V1NRKMSBFKTLAHAFV10W0RI0OHB1XRCR3WQUQBQTQPTZI1OM&client_secret=0PWPU23OCQVRECKPBCQ4LEJTEPI4AO3SCTIRTPOL2SQ1A3OQ&v=20140909', // Send value of the clicked button
          dataType: 'jsonp', // Choosing a JSON datatype
          success: function(data) // Variable data contains the data we get from serverside
          {

          		

                console.log(data);
                // for (var venue in data.response.venues) {
                for(var i = 0; i < data.response.groups[0].items.length; i++) {
                	console.log(data.response.groups[0].items[i]);
                	var lat = 	data.response.groups[0].items[i].venue.location.lat;
                	var lng = 	data.response.groups[0].items[i].venue.location.lng;
                	console.log(lat);
                	var title = "<h1>" + data.response.groups[0].items[i].venue.name + "</h1>";
                	var description = "<p>" + data.response.groups[0].items[i].venue.location.address + "</p>";
                	description += "<h6>" + data.response.groups[0].items[i].venue.hours.status + "</h6>";
                	description += "<a href='"+ data.response.groups[0].items[i].venue.url +"' target='_blank' class='raleway' >" + data.response.groups[0].items[i].venue.url + "</a>";
                	// "<a href='"+ bar +"'>" + foo + "</a>"
                    console.log("{" + lat + "," + lng + "}");

				
$("body").append(title + description);

                }
            }

    });
});




