import types from './types';
// import model from './models';

const VALID_EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function subscribe(req, res) {
  const email = req.params.email;
  let status = types.INTERNAL_ERROR;

  if (VALID_EMAIL_REGEX.test(email)) {
    status = types.SUBSCRIBED;
  } else {
    status = types.INVALID_EMAIL;
  }

  res.json({
    status,
  });
}

export function unsubscribe(req, res) {
  const email = req.params.email;
  res.json(`unsubscribed ${email}`);
}

export function listAll(req, res) {
  res.json('wassup');
}
