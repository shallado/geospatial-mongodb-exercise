// ------------- Add GeoJSON Data ---------------------
// places collection

// add a document with name 'California Academy of Sciences', location as an object with type 'Point', coordinates [-122.4724356, 37.7672544]
db.places.insertOne({
  name: 'California Academy of Sciences',
  location: {
    type: 'Point',
    coordinates: [-122,4724356, 37.7672544]
  }
});




