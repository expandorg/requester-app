import { combineReducers } from 'redux';

import { metamaskReducer as metamask } from '@expandorg/app-web3';
import { gemsBalanceReducer as gemsBalance } from '@expandorg/app-gemtokens';

import user from './userReducer';

import dashboardTasks from './dashboardTasksReducer';
import draftEntities from './drafts/draftEntitiesReducer';
import draftSaving from './drafts/draftSavingReducer';

import taskTemplatesList from './taskTemplates/taskTemplatesListReducer';
import taskTemplatesEntities from './taskTemplates/taskTemplatesEntitiesReducer';

import tasksEntities from './tasks/tasksEntitiesReducer';

import jobResponsesEntities from './jobs/jobResponsesEntitiesReducer';
import jobStatsEntities from './jobs/jobStatsEntitiesReducer';
import jobEntities from './jobs/jobEntitiesReducer';
import jobReports from './jobs/jobReportsReducer';

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
  jobs: combineReducers({
    entities: jobEntities,
    stats: jobStatsEntities,
    responses: jobResponsesEntities,
    reports: jobReports,
  }),
  tasks: combineReducers({
    entities: tasksEntities,
  }),
  taskTemplates: combineReducers({
    list: taskTemplatesList,
    entities: taskTemplatesEntities,
  }),
  formTemplates: combineReducers({
    list: formTemplatesList,
    entities: formTemplatesEntities,
  }),
  drafts: combineReducers({
    entities: draftEntities,
    saving: draftSaving,
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
