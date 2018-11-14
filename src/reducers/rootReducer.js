import { combineReducers } from 'redux';

import user from './userReducer';
import dashboardTasks from './dashboardTasksReducer';
import draftEntities from './drafts/draftEntitiesReducer';

import taskTemplatesList from './taskTemplates/taskTemplatesListReducer';
import taskTemplatesEntities from './taskTemplates/taskTemplatesEntitiesReducer';

import dataEntities from './data/dataEntitiesReducer';
import dataValues from './data/dataValuesReducer';

import eligible from './whitelist/eligibleUsersReducer';

import ui from './ui';

export default combineReducers({
  user,
  dashboardTasks,
  taskTemplates: combineReducers({
    list: taskTemplatesList,
    entities: taskTemplatesEntities,
  }),
  drafts: combineReducers({
    entities: draftEntities,
  }),
  data: combineReducers({
    entities: dataEntities,
    values: dataValues,
  }),
  whitelist: combineReducers({
    eligible,
  }),
  ui,
});
