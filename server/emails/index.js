import {
  subscribe,
  unsubscribe,
  listAll,
} from './rest';
import types from './types';
import { Email } from './models';

module.exports = {
  subscribe,
  unsubscribe,
  listAll,
  types,
  model: Email,
};
