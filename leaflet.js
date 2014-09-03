L.mapbox.accessToken = 'pk.eyJ1Ijoia2x1Y2UiLCJhIjoiUGtZSHRqWSJ9.jualfg8qfIHQHuLsaKlOBw';
var map = L.mapbox.map('map', 'examples.map-i86nkdio')
    .setView([40, -74.50], 9);

L.mapbox.featureLayer({
    // this feature is in the GeoJSON format: see geojson.org
    // for the full specification
    type: 'Feature',
    geometry: {
        type: 'Point',
        // coordinates here are in longitude, latitude order because
        // x, y is the standard for GeoJSON and many formats
        coordinates: [
          -77.03221142292,
          38.913371603574 
        ]
    },
    properties: {
        title: 'Peregrine Espresso',
        description: '1718 14th St NW, Washington, DC',
        // one can customize markers by adding simplestyle properties
        // https://www.mapbox.com/foundations/an-open-platform/#simplestyle
        'marker-size': 'large',
        'marker-color': '#BE9A6B',
        'marker-symbol': 'cafe'
    }
}).addTo(map);