var rest = require('./rest');
var type = require('./types');
var model = require('./models');

module.exports = {
  // types
  SUBSCRIBED: type.SUBSCRIBED,
  UNSUBSCRIBED: type.UNSUBSCRIBED,
  INVALID_EMAIL: type.INVALID_EMAIL,
  INTERNAL_ERROR: type.INTERNAL_ERROR,

  // email model
  Email: model.Email,

  // functions
  subscribe: rest.subscribe,
  unsubscribe: rest.unsubscribe,
  listAll: rest.listAll
};
