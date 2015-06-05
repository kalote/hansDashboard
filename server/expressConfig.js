var bodyParser = require('body-parser');

module.exports = function(app, express) {
  app.use("/", express.static("./"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
}
