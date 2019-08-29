// @flow
import { createSelector } from 'reselect';

import { makeDraftSelector } from './draftsSelectors';
import { defaultVariablesSelector } from './variablesSelectors';

export const dataStateSelector = (state: Object) => state.data;

export const dataEntitiesSelector: any = createSelector(
  dataStateSelector,
  state => state.entities
);

export const dataValuesSelector: any = createSelector(
  dataStateSelector,
  state => state.values
);

export const makeDataSelector = (): any =>
  createSelector(
    dataEntitiesSelector,
    dataValuesSelector,
    (state, id) => id,
    (state, id, page) => page,
    (entities, valueEntites, id, page) => {
      const entity = entities[id];
      if (!entity) {
        return null;
      }
      const { total, pages } = valueEntites[id];
      const values = pages[page] || [];
      return {
        ...entity,
        total,
        values:
          values.length > 500
            ? values.filter((_, index) => index < 500)
            : values,
      };
    }
  );

export const makeDataVarsSampleSelector = (): any => {
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
        const index = entity.columns.findIndex(col => col.variable === v);
        if (index === -1) {
          return all;
        }
        return { ...all, [v]: samplePage[0][index] };
      }, defaultVars);
      return variables;
    }
  );
};
