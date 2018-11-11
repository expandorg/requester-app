import { combineReducers } from 'redux';

import user from './userReducer';
import dashboardTasks from './dashboardTasksReducer';
import draftEntities from './drafts/draftEntitiesReducer';

import dataEntities from './data/dataEntitiesReducer';

import ui from './ui';

export default combineReducers({
  user,
  dashboardTasks,
  drafts: combineReducers({
    entities: draftEntities,
  }),
  data: combineReducers({
    entities: dataEntities,
  }),
  ui,
});
