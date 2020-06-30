// ------------- Add GeoJSON Data ---------------------
// places collection

// add a document with name 'California Academy of Sciences', location as an object with type 'Point', coordinates [-122.4724356, 37.7672544]
db.places.insertOne({
  name: 'California Academy of Sciences',
  location: {
    type: 'Point',
    coordinates: [-122.4724356, 37.7672544]
  }
});

// ------------- Adding a GeoSpatial Index to Track the Distance ---------------
// create geospatial index with the field location
db.places.createIndex({
  location: '2dsphere'
});

// find locations that are between 10 and 500 meters from this given location -122.471114, 37.771104
db.places.find({
  location: {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [-122.471114, 37.771104],
        $maxDistance: 10,
        $maxDistance: 500
      }
    }
  }
});





