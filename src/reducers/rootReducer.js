import { combineReducers } from 'redux';

import user from './userReducer';
import dashboardTasks from './dashboardTasksReducer';
import draftEntities from './drafts/draftEntitiesReducer';

import ui from './ui';

export default combineReducers({
  user,
  dashboardTasks,
  drafts: combineReducers({
    entities: draftEntities,
  }),
  ui,
});
