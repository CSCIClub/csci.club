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
app.get('/api', function(req, res) {
  res.json({
    'emails_url': 'http://csci.club/api'
  });
});

// Email routes
app.get('/api/emails', email.listAll);
app.get('/api/email/subscribe/:email', email.subscribe);
app.get("/api/email/unsubscribe/:email", email.unsubscribe);


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
