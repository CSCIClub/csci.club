var rest = require('./rest');
var type = require('./types');
var model = require('./models');

module.exports = {
  // types
  SUCCESS: type.SUCCESS,
  INVALID_EMAIL: type.INVALID_EMAIL,
  ALREADY_REGISTERED: type.ALREADY_REGISTERED,
  INTERNAL_ERROR: type.INTERNAL_ERROR,

  // email model
  Email: model.Email,

  // functions
  register: rest.register,
  unregister: rest.unregister,
  listAll: rest.listAll
};
