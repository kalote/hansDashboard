var express = require('express'),
    netatmo = require('netatmo'),
    FlowerPower = require('node-flower-power'),
    _ = require('lodash'),
    app = express();

// Load Express Configuration
require('./expressConfig')(app, express);

// Root route
app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/device', function(req, res){
  //TODO
  //put this data in a safe place
  var auth = {
    "client_id": "55710cf7a88d1fc6488b456f",
    "client_secret": "mMDbd3wfNhJcYqmMRJWWhK8kHcGMkL7pZsNmiy6q",
    "username": "home@sandkuhl.net",
    "password": "Stylish6770",
  };

  var api = new netatmo(auth);

  // Get Devicelist
  api.getDevicelist(function(err, devices, modules) {
    var out = [];
    _.each(devices, function(key,val) {
      //hard code for HONG KONG
      if (key.station_name == "Hong Kong"){
        out.push({
            insidePlace: key.module_name,
            insideTemp: key.dashboard_data.Temperature+"&deg;C"
        });
      }
    });
    res.send(out);
  });
});

app.get('/flower', function(req, res){
  var auth = {
    username: 'home@sandkuhl.net',
    password: 'Stylish6770',
    client_id: 'johannbich@gmail.com',
    client_secret: 'Q54IQEwhdIdXTbhv7eIJSXxJcobzrZBrWBN94XbHD6iWwlxi',
  };

  var api = new FlowerPower(auth, function(err, data) {
    if(err) {
      console.log('Error:', err);
    } else {
      console.log('Logged in');
    }
  });

  api.getGardenLocation(function(err, locations, sensors) {
    _.each(locations, function (key, val) {
      //hard code for HONG KONG plant
      if (key.location_identifier == "H2Ncg4itfe1432884521476"){
        switch (key.soil_moisture.status_key) {
          case "waiting_data":
          case "predicted_action":
            res.send({status: "waiting"});
            break;
          case "status_ok":
            res.send({status: "flowerOk"});
            break;
          case "status_warning":
            res.send({status: "flowerWarning"});
            break;
          case "status_critical":
            res.send({status: "flowerCritical"});
            break;
        }
      }
    });
  });
})

module.exports = app;
