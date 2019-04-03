import { combineReducers } from 'redux';

import { metamaskReducer as metamask } from '@expandorg/app-web3';
import { gemsBalanceReducer as gemsBalance } from '@expandorg/app-gemtokens';

import user from './userReducer';

import dashboardTasks from './dashboardTasksReducer';
import draftEntities from './drafts/draftEntitiesReducer';

import taskTemplatesList from './taskTemplates/taskTemplatesListReducer';
import taskTemplatesEntities from './taskTemplates/taskTemplatesEntitiesReducer';

import jobStatsEntities from './jobStats/jobStatsEntitiesReducer';

import formTemplatesList from './formTemplates/formTemplatesListReducer';
import formTemplatesEntities from './formTemplates/formTemplatesEntitiesReducer';

import dataEntities from './data/dataEntitiesReducer';
import dataValues from './data/dataValuesReducer';

import eligible from './whitelist/eligibleUsersReducer';

import accessToken from './accessTokenReducer';

import ui from './ui';

export default combineReducers({
  user,
  gemsBalance,
  dashboardTasks,
  taskTemplates: combineReducers({
    list: taskTemplatesList,
    entities: taskTemplatesEntities,
  }),
  jobStats: combineReducers({
    entities: jobStatsEntities,
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
  accessToken,
  whitelist: combineReducers({
    eligible,
  }),
  web3: combineReducers({
    metamask,
  }),
  ui,
});
