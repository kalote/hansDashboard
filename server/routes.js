var express = require('express'),
    netatmo = require('netatmo'),
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

module.exports = app;
