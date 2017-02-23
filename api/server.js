var express = require('express');
var bodyParser = require('body-parser');
var email = require('./emails');

var app = express();

if (process.env.NODE_ENV === 'test') {
  app.set('port', (process.env.PORT || 3001));
} else {
  app.set('port', (process.env.PORT || 3000));
}

// add json middleware
app.use(bodyParser.json());

// this is recommended for some reason; not really needed
app.use(bodyParser.urlencoded({ extended: true }));

// Informational root routes
app.route('/')
  .get(function(req, res) {
    res.json({
      'emails_url': 'http://api.csci.club'
    });
  });

// Email routes
app.get('/emails', email.listAll);
app.get('/email/register/:email', email.register);
app.get("/email/unregister:email", email.unregister);


(function() {
  var ensureOneInstanceDuringTesting =
      (process.env.NODE_ENV === 'test') ? !module.parent : true;

  if (ensureOneInstanceDuringTesting) {
    var port = app.get('port');
    app.listen(port);
    console.log('Listening on ' + port + ' in ' + process.env.NODE_ENV + ' mode.');
  }
})();

module.exports = app;
