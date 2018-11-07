import { combineReducers } from 'redux';

import user from './userReducer';
import dashboardTasks from './dashboardTasksReducer';

import ui from './ui';

export default combineReducers({
  user,
  dashboardTasks,
  ui,
});
