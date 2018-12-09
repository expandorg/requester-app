import { combineReducers } from 'redux';

import { userReducer as user } from '@gemsorg/app-auth';
import { metamaskReducer as metamask } from '@gemsorg/app-web3';
import { gemsBalanceReducer as gemsBalance } from '@gemsorg/app-gemtokens';

import dashboardTasks from './dashboardTasksReducer';
import draftEntities from './drafts/draftEntitiesReducer';

import taskTemplatesList from './taskTemplates/taskTemplatesListReducer';
import taskTemplatesEntities from './taskTemplates/taskTemplatesEntitiesReducer';

import taskStatsEntities from './taskStats/taskStatsEntitiesReducer';

import formTemplatesList from './formTemplates/formTemplatesListReducer';
import formTemplatesEntities from './formTemplates/formTemplatesEntitiesReducer';

import dataEntities from './data/dataEntitiesReducer';
import dataValues from './data/dataValuesReducer';

import eligible from './whitelist/eligibleUsersReducer';

import ui from './ui';

export default combineReducers({
  user,
  gemsBalance,
  dashboardTasks,
  taskTemplates: combineReducers({
    list: taskTemplatesList,
    entities: taskTemplatesEntities,
  }),
  taskStats: combineReducers({
    entities: taskStatsEntities,
  }),
  formTemplates: combineReducers({
    list: formTemplatesList,
    entities: formTemplatesEntities,
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
  web3: combineReducers({
    metamask,
  }),
  ui,
});
