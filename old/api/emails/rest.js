var type = require('./types');
var model = require('./models');

var VALID_EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports.subscribe = function(req, res) {
  var email = req.params.email;
  var status = type.INTERNAL_ERROR;

  if (VALID_EMAIL_REGEX.test(email)) {
    status = type.SUBSCRIBED;
  } else {
    status = type.INVALID_EMAIL;
  }

  res.json({
    status: status
  });
};

module.exports.unsubscribe = function(req, res) {
  var email = res.params.email;
};

module.exports.listAll = function(req, res) {};
