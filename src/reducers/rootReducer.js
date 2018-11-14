import { combineReducers } from 'redux';

import user from './userReducer';
import dashboardTasks from './dashboardTasksReducer';
import taskTemplates from './taskTemplatesReducer';
import draftEntities from './drafts/draftEntitiesReducer';

import dataEntities from './data/dataEntitiesReducer';
import dataValues from './data/dataValuesReducer';

import eliligible from './whitelist/eliligibleUsersReducer';

import ui from './ui';

export default combineReducers({
  user,
  dashboardTasks,
  taskTemplates,
  drafts: combineReducers({
    entities: draftEntities,
  }),
  data: combineReducers({
    entities: dataEntities,
    values: dataValues,
  }),
  whitelist: combineReducers({
    eliligible,
  }),
  ui,
});
