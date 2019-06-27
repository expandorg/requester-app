// @flow
import { createSelector } from 'reselect';

import { makeDraftSelector } from './draftsSelectors';

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
    (state, draftId, dataId) => dataId,
    (entities, valueEntites, draft, dataId) => {
      if (!draft.variables) {
        return null;
      }

      const entity = entities[dataId];
      if (!entity) {
        return null;
      }
      const samplePage = valueEntites[dataId].pages[0];
      if (!samplePage) {
        return null;
      }
      return draft.variables.reduce((all, v) => {
        const index = entity.columns.findIndex(col => col.name === v);
        if (index === -1) {
          return all;
        }
        return { ...all, [v]: samplePage[0][index] };
      }, {});
    }
  );
};
