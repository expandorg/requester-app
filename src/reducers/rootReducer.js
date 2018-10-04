import { combineReducers } from 'redux';

import user from './userReducer';

import ui from './ui';

export default combineReducers({
  user,
  ui,
});
