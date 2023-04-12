import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import message from './message';
import file from './file';
import admin from './admin';
import payment from './payment';
import user from './user';

export default combineReducers({
  alert,
  auth,
  message,
  file,
  admin,
  payment,
  user
});
