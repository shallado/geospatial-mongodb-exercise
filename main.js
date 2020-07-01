// ------------- Add GeoJSON Data ---------------------
// places collection

// add a document with name 'California Academy of Sciences', location that has a geoJSON object with these coordinates -122.4724356, 37.7672544
db.places.insertOne({
  name: 'California Academy of Sciences',
  location: {
    type: 'Point',
    coordinates: [-122.4724356, 37.7672544]
  }
});

// ------------- Adding a GeoSpatial Index to Track the Distance ---------------
// places collection

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

// ------------- Adding Additional Locations ------------------
// places collection

// add these 3 documents include 
  // name fields 'Conservatory of Flowers', 'Golden Gate Tennis Park', 'Nopa'
  // location field containing geoJSON object
    // coordinates for each location
    // -122.4615748, 37.7701756
    // -122.4593702, 37.7705046
    // -122.4389058, 37.7747415

db.places.insertMany([{
  name: 'Conservatory of Flowers',
  location: {
    type: 'Point',
    coordinates: [-122.4615748, 37.7701756]
  }
}, {
  name: 'Golden Gate Tennis Park',
  location: {
    type: 'Point',
    coordinates: [-122.4593702, 37.7705046]
  }
}, {
  name: 'Nopa',
  location: {
    type: 'Point',
    coordinates: [-122.4389058, 37.7747415]
  }
}]);

// ------------- Find Places Inside a Certain Area ------------------
// places collection

// create variables named p1, p2, p3, p4 with the given coordinates
// -122.4547, 37.77473
// -122.45303, 37.76641
// -122.51026, 37.76411
// -122.51088, 37.77131
const p1 = [-122.4547, 37.77473];
const p2 = [-122.45303, 37.76641];
const p3 = [-122.51026, 37.76411];
const p4 = [-122.51088, 37.77131];

// find certain locations with the coordinates given above 
  // Nopa location should not be included in the results
db.places.find({
  location: {
    $geoWithin: {
      $geometry: {
        type: 'Polygon',
        coordinates: [[p1, p2, p3, p4, p1]]
      }
    }
  }
});

// ------------- Find Out If a User Is Inside a Specific Area ------------------
// areas collection

// insert document with field name 'Golden Gate Park', area field with value of a geoJSON object representing the area golden gate park uses
db.areas.insertOne({
  name: 'Golden Gate Park',
  area: {
    type: 'Polygon',
    coordinates: [[p1, p2, p3, p4, p1]]
  }
});

// create geospatial index with the field area
db.areas.createIndex({
  area: '2dsphere'
});

// find locations that intersect the given coordinates -122.49089, 37.76992 on the field area it should a point
// observe results
db.areas.find({
  area: {
    $geoIntersects: {
      $geometry: {
        type: 'Point',
        coordinates: [-122.49089, 37.76992]
      }
    }
  }
});

// find locations that intersect the given coordinates -122.48446, 37.77776 on the field area it should a point
// observe results
db.areas.find({
  area: {
    $geoIntersects: {
      $geometry: {
        type: 'Point',
        coordinates: [-122.48446, 37.77776]
      }
    }
  }
});

// ------------- Find Places Within a Certain Radius ------------------
// places collection

// find a location that is within the center coordinates -122.46203, 37.77286 and radius of 1 miles
// it should return all but Nopa location
db.places.find({
  location: {
    $geoWithin: {
      $centerSphere: [
        [-122.46203, 37.77286],
        1 / 3963.2
      ]
    }
  }
});

// update Nopa location with these coordinates so it's included in the query
// -122.46636, 37.77014
db.places.updateOne({
  _id: ObjectId('5efbdf92c389cacb100e5b85')
}, {
  $set: {
    location: {
      type: 'Point',
      coordinates: [-122.46636, 37.77014]
    }
  }
});

// run the find query again and see if the change includes Nopa Location
db.places.find({
  location: {
    $geoWithin: {
      $centerSphere: [
        [-122.46203, 37.77286],
        1 / 3963.2
      ]
    }
  }
});