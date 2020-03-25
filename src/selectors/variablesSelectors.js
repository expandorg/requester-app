// @flow
import { createSelector } from 'reselect';
import { userSelector } from '@expandorg/app-auth/selectors';

import { makeDraftSelector } from './draftsSelectors';

import { dataEntitiesSelector, dataValuesSelector } from './dataSelectors';

// eslint-disable-next-line import/prefer-default-export
export const defaultVariablesSelector: any = createSelector(
  userSelector,
  (user) => ({
    workerId: user.id,
  })
);

export const makeVariablesSampleSelector = (): any => {
  const draftSelector = makeDraftSelector();
  return createSelector(
    dataEntitiesSelector,
    dataValuesSelector,
    draftSelector,
    defaultVariablesSelector,
    (state, draftId, dataId) => dataId,
    (entities, valueEntites, draft, defaultVars, dataId) => {
      if (!draft || !draft.variables) {
        return defaultVars;
      }

      const entity = entities[dataId];
      if (!entity) {
        return defaultVars;
      }

      const samplePage = valueEntites[dataId].pages[0];
      if (!samplePage) {
        return defaultVars;
      }

      const variables = draft.variables.reduce((all, v) => {
        const index = entity.columns.findIndex((col) => col.variable === v);
        if (index === -1) {
          return all;
        }
        return {
          ...all,
          [v]: samplePage[0][index],
        };
      }, defaultVars);
      return variables;
    }
  );
};
